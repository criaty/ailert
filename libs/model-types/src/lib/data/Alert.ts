export interface Alert {
  title: string;
  description: string;
  imageUrl?: string;
  contextToWatch: string;
  outputType: 'json' | 'text';
  outputExample: string;
  actionType: 'display_text' | 'synthesize_voice' | 'call_webhook';
  actionOption: string; // Voice options or webhook URL
}

// Alert for a child in danger with JSON output and text display
export const CHILD_IN_DANGER_ALERT: Alert = {
  title: 'ui:autistic_child_alert_title',
  description: 'ui:autistic_child_alert_description',
  imageUrl: 'public/images/autistic-child-alert.webp',
  contextToWatch: 'Autistic child at risk of injury',
  outputType: 'json',
  outputExample:
    '{"risk": "low", "message": "Child is safe"} or {"risk": "medium", "message": "Describe the child\'s situation"} or {"risk": "high", "message": "CHILD IN DANGER! describe the child\'s situation"}',
  actionType: 'display_text',
  actionOption: '',
};

// Alert for an animal making a mess with text output and voice synthesis
export const ANIMAL_MAKING_MESS_ALERT: Alert = {
  title: 'ui:making_mess_alert_title',
  description: 'ui:making_mess_alert_description',
  imageUrl: 'public/images/animal-causing-mess-alert.webp',
  contextToWatch: 'Animal making a mess',
  outputType: 'text',
  outputExample: 'Describe the mess the animal is making',
  actionType: 'synthesize_voice',
  actionOption: 'voice_option_1',
};

// Alert for an elder in risk to fall with JSON output and webhook call
export const ELDER_FALL_ALERT: Alert = {
  title: 'ui:elder_fall_alert_title',
  description: 'ui:elder_fall_alert_description',
  imageUrl: 'public/images/elder-fall-alert.webp',
  contextToWatch: 'Elder is getting up from bed with a risk to fall',
  outputType: 'json',
  outputExample:
    '{"risk": "low", "message": "Elder is safe"} or {"risk": "medium", "message": "Describe the elder\'s situation"} or {"risk": "high", "message": "ELDER IN DANGER! describe the elder\'s situation"}',
  actionType: 'call_webhook',
  actionOption:
    'https://us-central1-criaty-ailert.cloudfunctions.net/elderFallAlert',
};

export const DEFAULT_ALERTS: Alert[] = [
  CHILD_IN_DANGER_ALERT,
  ANIMAL_MAKING_MESS_ALERT,
  ELDER_FALL_ALERT,
];
