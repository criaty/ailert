export interface Alert {
  title: string;
  description: string;
  imageUrl: string;
  contextToWatch: string;
  outputMessage: string;
  voiceOption?: string;
  webhook?: string;
  webhookKey?: string;
}

export enum AlertRisk {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export interface AlertData {
  risk: AlertRisk;
  message: string;
  image64: string;
}

// Alert for a child in danger
export const CHILD_IN_DANGER_ALERT: Alert = {
  title: 'model-types:autistic_child_alert_title',
  description: 'model-types:autistic_child_alert_description',
  imageUrl: '/images/autistic-child-alert.webp',
  contextToWatch: 'Autistic child at risk of injury',
  outputMessage: 'Describe what the autistic child is doing',
};

// Alert for an animal making a mess with voice synthesis
export const ANIMAL_MAKING_MESS_ALERT: Alert = {
  title: 'model-types:making_mess_alert_title',
  description: 'model-types:making_mess_alert_description',
  imageUrl: '/images/animal-causing-mess-alert.webp',
  contextToWatch: 'Animal making a mess',
  outputMessage: 'Describe the mess the animal is making',
  voiceOption: 'voice_option_1',
};

// Alert for an elder in risk to fall with webhook call
export const ELDER_FALL_ALERT: Alert = {
  title: 'model-types:elder_fall_alert_title',
  description: 'model-types:elder_fall_alert_description',
  imageUrl: '/images/elder-fall-alert.webp',
  contextToWatch: 'Elder is getting up from bed with a risk to fall',
  outputMessage: "The elder's situation",
  webhook:
    'https://us-central1-criaty-ailert.cloudfunctions.net/elderFallAlert',
  webhookKey: 'criaty-ailert',
};

// Alert for happy persons with webhook call
export const HAPPY_PERSON_ALERT: Alert = {
  title: 'model-types:happy_person_alert_title',
  description: 'model-types:happy_person_alert_description',
  imageUrl: '/images/elder-fall-alert.webp',
  contextToWatch:
    'One or more happy persons. If persons are moderately happy, the risk is medium. If persons are very happy, the risk is high.',
  outputMessage:
    'Describe the persons\' situation. Add "A HAPPY DAY!" in the beginning if risk is high',
  webhook: 'http://localhost:5001/criaty-ailert/us-central1/happyPersonAlert',
  // webhook:
  //   'https://us-central1-criaty-ailert.cloudfunctions.net/happyPersonAlert',
  webhookKey: 'criaty-ailert',
};

export const DEFAULT_ALERTS: Alert[] = [
  HAPPY_PERSON_ALERT,
  CHILD_IN_DANGER_ALERT,
  ANIMAL_MAKING_MESS_ALERT,
  ELDER_FALL_ALERT,
];
