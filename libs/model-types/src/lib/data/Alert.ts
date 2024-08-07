export interface Alert {
  contextToWatch: string;
  outputType: 'json' | 'text';
  outputExample: string;
  actionType: 'display_text' | 'synthesize_voice' | 'call_webhook';
  actionOption: string; // Voice options or webhook URL
}

// Alert for a child in danger with JSON output and text display
export const CHILD_IN_DANGER_ALERT: Alert = {
  contextToWatch: 'Autistic child at risk of injury',
  outputType: 'json',
  outputExample:
    '{"risk": "low", "message": "Child is safe"} or {"risk": "medium", "message": "Describe the child\'s situation"} or {"risk": "high", "message": "CHILD IN DANGER! describe the child\'s situation"}',
  actionType: 'display_text',
  actionOption: '',
};

// Alert for an animal making a mess with text output and voice synthesis
export const ANIMAL_MAKING_MESS_ALERT: Alert = {
  contextToWatch: 'Animal making a mess',
  outputType: 'text',
  outputExample: 'Describe the mess the animal is making',
  actionType: 'synthesize_voice',
  actionOption: 'voice_option_1',
};

// Alert for an elder in risk to fall with JSON output and webhook call
export const ELDER_FALL_ALERT: Alert = {
  contextToWatch: 'Elder is getting up from bed with a risk to fall',
  outputType: 'json',
  outputExample:
    '{"risk": "low", "message": "Elder is safe"} or {"risk": "medium", "message": "Describe the elder\'s situation"} or {"risk": "high", "message": "ELDER IN DANGER! describe the elder\'s situation"}',
  actionType: 'call_webhook',
  actionOption:
    'https://us-central1-criaty-ailert.cloudfunctions.net/elderFallAlert',
};
