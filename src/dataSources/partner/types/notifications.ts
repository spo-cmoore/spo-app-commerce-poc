export enum PushChannel {
  DEALS = 'deals',
  ORDERS = 'orders',
  REWARDS = 'rewards',
}

export enum PushPlatform {
  ANDROID = 'android',
  IOS = 'ios',
}

export enum CommunicationPreferencesSource {
  DEALS = 'app-deals',
  NOTIFICATIONS = 'app-notifications',
}

export interface CommunicationPreferences {
  campaigns?: boolean
  dailyFinds?: boolean
  surveys?: boolean
  liveStreams?: boolean
  profile: {
    id?: string
    email: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }
}

export interface CommunicationPreferenceRequest {
  source: CommunicationPreferencesSource
  campaigns: boolean
  dailyFinds: boolean
  surveys: boolean
  liveStreams: boolean
  profile: {
    id?: string
    email: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }
}

export interface PushDevice {
  deviceId: string
  os: PushPlatform
  deviceLabel?: string
}

export interface PushSubscription {
  userId: string
  channelId: PushChannel
  devices: PushDevice[]
  active: boolean
}

export type PushSubscriptionRequestBody = Omit<PushSubscription, 'active'>

export type PushSubscriptionMap = {
  [k in PushChannel]?: PushSubscription
}
