export interface Alert {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  contextToWatch: string;
  outputMessage: string;
  voiceOption?: string;
  webhookUrl?: string;
  webhookKey?: string;
  isDefault?: boolean;
  createdAt?: string;
}

export enum AlertRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface AlertData {
  id?: string;
  title: string;
  risk: AlertRisk;
  message: string;
  image64: string;
  createdAt: string;
}

// Alert for a child in danger
export const CHILD_IN_DANGER_ALERT: Alert = {
  id: 'default2',
  title: 'model-types:autistic_child_alert_title',
  description: 'model-types:autistic_child_alert_description',
  imageUrl: '/images/autistic-child-alert.webp',
  contextToWatch: 'model-types:autistic_child_alert_context_watch',
  outputMessage: 'model-types:autistic_child_alert_output_message',
  isDefault: true,
};

// Alert for an animal making a mess with voice synthesis
export const ANIMAL_MAKING_MESS_ALERT: Alert = {
  id: 'default3',
  title: 'model-types:making_mess_alert_title',
  description: 'model-types:making_mess_alert_description',
  imageUrl: '/images/animal-causing-mess-alert.webp',
  contextToWatch: 'model-types:making_mess_alert_context_watch',
  outputMessage: 'model-types:making_mess_alert_output_message',
  voiceOption: 'voice_option_1',
  isDefault: true,
};

// Alert for an elder in risk to fall with webhookUrl call
export const ELDER_FALL_ALERT: Alert = {
  id: 'default4',
  title: 'model-types:elder_fall_alert_title',
  description: 'model-types:elder_fall_alert_description',
  imageUrl: '/images/elder-fall-alert.webp',
  contextToWatch: 'model-types:elder_fall_alert_context_watch',
  outputMessage: 'model-types:elder_fall_alert_output_message',
  webhookUrl:
    'https://us-central1-criaty-ailert.cloudfunctions.net/webhookExample',
  webhookKey: 'criaty-ailert',
  isDefault: true,
};

// Alert for happy persons with webhookUrl call
export const HAPPY_PERSON_ALERT: Alert = {
  id: 'default1',
  title: 'model-types:happy_person_alert_title',
  description: 'model-types:happy_person_alert_description',
  imageUrl: '/images/happy-persons-alert.webp',
  contextToWatch: 'model-types:happy_person_alert_context_watch',
  outputMessage: 'model-types:happy_person_alert_output_message',
  webhookUrl: 'http://localhost:5001/criaty-ailert/us-central1/webhookExample',
  // webhookUrl:
  //   'https://us-central1-criaty-ailert.cloudfunctions.net/webhookExample',
  webhookKey: 'criaty-ailert',
  isDefault: true,
};

export const DEFAULT_ALERTS: Alert[] = [
  HAPPY_PERSON_ALERT,
  CHILD_IN_DANGER_ALERT,
  ANIMAL_MAKING_MESS_ALERT,
  ELDER_FALL_ALERT,
];
