from __future__ import annotations

import argparse
import os
from datetime import datetime, timezone
from typing import Any

from google.oauth2 import service_account
from googleapiclient.discovery import build


TAG_MANAGER_SCOPES = [
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
  'https://www.googleapis.com/auth/tagmanager.publish',
]
GA4_SCOPES = ['https://www.googleapis.com/auth/analytics.edit']

GTM_ACCOUNT_ID = '6270573202'
GTM_CONTAINER_ID = '207122630'
GTM_PUBLIC_ID = 'GTM-NJLP7HKQ'
GTM_DEFAULT_WORKSPACE_NAME = 'Default Workspace'
GA4_PROPERTY_ID = '479618299'
GA4_MEASUREMENT_ID = 'G-EZE9DZN5J5'

LEGACY_GTM_TAGS = {
  'Google Tag Analitics',
  'Google Tag G-EZE9DZN5J5',
  'GA4 Event - ASF Measured Events',
}
LEGACY_GTM_TRIGGERS = {
  'button_click',
  'scroll_depth',
  'form_submit',
  'CE - ASF Measured Events',
}
LEGACY_GTM_VARIABLES = {
  'DLV - Button ID',
  'DLV - Comp Name',
  'DLV - Scroll Depth',
  'DLV - Field',
  'DLV - source',
  'DLV - field_name',
  'DLV - practice_area',
  'DLV - service_slug',
  'DLV - service_title',
  'DLV - error_type',
  'DLV - booking_mode',
  'DLV - platform',
  'DLV - area_slug',
  'DLV - area_title',
  'DLV - article_slug',
  'DLV - link_text',
  'DLV - link_url',
  'DLV - faq_question',
}
LEGACY_GTM_TEMPLATES = {'iubenda Privacy Controls and Cookie Solution'}
LEGACY_GA4_KEY_EVENTS = {'click', 'form_submit', 'page_view'}
LEGACY_GA4_DIMENSIONS = {'button_id', 'component'}

KEY_EVENTS = [
  'lead_form_submit_success',
  'booking_click',
  'whatsapp_click',
  'phone_click',
]

CUSTOM_DIMENSIONS = [
  'source',
  'field_name',
  'practice_area',
  'service_slug',
  'service_title',
  'error_type',
  'booking_mode',
  'platform',
  'area_slug',
  'area_title',
  'article_slug',
  'link_text',
  'link_url',
  'scroll_depth',
  'faq_question',
]


def build_credentials(path: str, scopes: list[str]):
  return service_account.Credentials.from_service_account_file(path, scopes=scopes)


def list_resources(resource: Any, parent: str, key: str) -> list[dict[str, Any]]:
  return resource.list(parent=parent).execute().get(key, [])


def get_container_parent() -> str:
  return f'accounts/{GTM_ACCOUNT_ID}/containers/{GTM_CONTAINER_ID}'


def get_active_workspace_path(service: Any) -> str:
  container_parent = get_container_parent()
  workspaces = (
    service.accounts()
    .containers()
    .workspaces()
    .list(parent=container_parent)
    .execute()
    .get('workspace', [])
  )
  if not workspaces:
    raise RuntimeError('No GTM workspaces found.')

  for workspace in workspaces:
    if workspace.get('name') == GTM_DEFAULT_WORKSPACE_NAME:
      return workspace['path']

  return workspaces[0]['path']


def upsert_gtm_configuration(credentials_path: str) -> dict[str, Any]:
  creds = build_credentials(credentials_path, TAG_MANAGER_SCOPES)
  service = build('tagmanager', 'v2', credentials=creds, cache_discovery=False)
  workspace_path = get_active_workspace_path(service)
  workspaces = service.accounts().containers().workspaces()

  tags_api = workspaces.tags()
  triggers_api = workspaces.triggers()
  variables_api = workspaces.variables()
  templates_api = workspaces.templates()

  tags = {
    item['name']: item for item in list_resources(tags_api, workspace_path, 'tag')
  }
  triggers = {
    item['name']: item
    for item in list_resources(triggers_api, workspace_path, 'trigger')
  }
  variables = {
    item['name']: item
    for item in list_resources(variables_api, workspace_path, 'variable')
  }
  templates = {
    item['name']: item
    for item in list_resources(templates_api, workspace_path, 'template')
  }

  for name in sorted(LEGACY_GTM_TAGS):
    item = tags.get(name)
    if item:
      tags_api.delete(path=item['path']).execute()

  for name in sorted(LEGACY_GTM_TEMPLATES):
    item = templates.get(name)
    if item:
      templates_api.delete(path=item['path']).execute()

  for name in sorted(LEGACY_GTM_TRIGGERS):
    item = triggers.get(name)
    if item:
      triggers_api.delete(path=item['path']).execute()

  for name in sorted(LEGACY_GTM_VARIABLES):
    item = variables.get(name)
    if item:
      variables_api.delete(path=item['path']).execute()

  version = workspaces.create_version(
    path=workspace_path,
    body={
      'name': f'ASF analytics sync {datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")}',
      'notes': 'Remove iubenda and legacy GA tags. Keep GTM container clean while GA4 events are dispatched by the app.',
    },
  ).execute()

  publish_result = (
    service.accounts()
    .containers()
    .versions()
    .publish(path=version['containerVersion']['path'])
    .execute()
  )

  return {
    'containerVersionPath': version['containerVersion']['path'],
    'containerVersionId': version['containerVersion'].get('containerVersionId'),
    'compilerError': version.get('compilerError', False),
    'publishFingerprint': publish_result.get('containerVersion', {}).get('fingerprint'),
    'newWorkspacePath': version.get('newWorkspacePath'),
  }


def upsert_ga4_configuration(credentials_path: str) -> dict[str, Any]:
  creds = build_credentials(credentials_path, GA4_SCOPES)
  service = build('analyticsadmin', 'v1beta', credentials=creds, cache_discovery=False)
  parent = f'properties/{GA4_PROPERTY_ID}'

  custom_dimensions_api = service.properties().customDimensions()
  key_events_api = service.properties().keyEvents()

  dimensions = {
    item['parameterName']: item
    for item in custom_dimensions_api.list(parent=parent).execute().get(
      'customDimensions', []
    )
  }

  for parameter_name in sorted(LEGACY_GA4_DIMENSIONS):
    dimension = dimensions.get(parameter_name)
    if dimension:
      custom_dimensions_api.archive(name=dimension['name'], body={}).execute()

  dimensions = {
    item['parameterName']: item
    for item in custom_dimensions_api.list(parent=parent).execute().get(
      'customDimensions', []
    )
  }
  for parameter_name in CUSTOM_DIMENSIONS:
    if parameter_name in dimensions:
      continue
    custom_dimensions_api.create(
      parent=parent,
      body={
        'parameterName': parameter_name,
        'displayName': parameter_name,
        'scope': 'EVENT',
      },
    ).execute()

  key_events = {
    item['eventName']: item
    for item in key_events_api.list(parent=parent).execute().get('keyEvents', [])
  }

  for event_name in sorted(LEGACY_GA4_KEY_EVENTS):
    key_event = key_events.get(event_name)
    if key_event and key_event.get('deletable'):
      key_events_api.delete(name=key_event['name']).execute()

  key_events = {
    item['eventName']: item
    for item in key_events_api.list(parent=parent).execute().get('keyEvents', [])
  }
  for event_name in KEY_EVENTS:
    if event_name in key_events:
      continue
    key_events_api.create(
      parent=parent,
      body={
        'eventName': event_name,
        'countingMethod': 'ONCE_PER_EVENT',
      },
    ).execute()

  final_dimensions = custom_dimensions_api.list(parent=parent).execute().get(
    'customDimensions', []
  )
  final_key_events = key_events_api.list(parent=parent).execute().get(
    'keyEvents', []
  )

  return {
    'customDimensions': [item['parameterName'] for item in final_dimensions],
    'keyEvents': [item['eventName'] for item in final_key_events],
  }


def parse_args() -> argparse.Namespace:
  parser = argparse.ArgumentParser(
    description='Sync GTM container and GA4 property for abogadossanfelipe.cl'
  )
  parser.add_argument(
    '--credentials',
    default=os.environ.get('GOOGLE_APPLICATION_CREDENTIALS'),
    help='Path to the Google service account JSON file.',
  )
  return parser.parse_args()


def main() -> None:
  args = parse_args()

  if not args.credentials:
    raise SystemExit(
      'Missing credentials path. Pass --credentials or set GOOGLE_APPLICATION_CREDENTIALS.'
    )

  gtm_result = upsert_gtm_configuration(args.credentials)
  ga4_result = upsert_ga4_configuration(args.credentials)

  print('GTM synchronized:')
  print(f'  container: {GTM_PUBLIC_ID}')
  print(f'  version id: {gtm_result["containerVersionId"]}')
  print(f'  compiler error: {gtm_result["compilerError"]}')
  print('GA4 synchronized:')
  print(f'  property: {GA4_PROPERTY_ID}')
  print(f'  key events: {", ".join(ga4_result["keyEvents"])}')
  print(f'  custom dimensions: {", ".join(ga4_result["customDimensions"])}')


if __name__ == '__main__':
  main()
