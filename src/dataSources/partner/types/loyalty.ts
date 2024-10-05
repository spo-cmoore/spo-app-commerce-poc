/**
 * System names for loyalty tiers
 * Tier names correspond to internal IDs on SPO's loyalty API
 */
export enum LoyaltyTier {
  MEMBER = 'zrl_silver',
  SELECT = 'zrl_gold',
  ELITE = 'zrl_platinum',
  SECRET = 'zrl_super_platinum',
}

/**
 * Activities that we need to add special behavior to
 */
export enum ActivityId {
  ACCOUNT_CREATE = 'created_an_account',
  ANNIVERSARY = 'anniversary_bonus',
  BIRTHDAY = 'birthday_bonus',
  MOBILE_LOGIN = 'mobile_app_login',
  PURCHASE = 'made_a_purchase',
  PUSH = 'push_subscription',
  SMS = 'sms_subscription',
  SOCIAL_FACEBOOK = 'share_on_facebook',
  SOCIAL_INSTA = 'follow_on_instagram',
  SOCIAL_TIKTOK = 'follow_on_tiktok',
  STYLE_QUIZ = 'complete_style_quiz',
  SURVEY = 'complete_survey',
  REDEEMED_POINTS = 'redeemed_points_rollback',
  AMBASSADOR = 'brand_ambassador_award',
}

export interface PointExpirationResponse {
  points?: number
  expirationDate?: string
}

export interface Reward {
  id: string
  name: string
  description: string
  eligibilityCriteria?: string
  isActive: boolean
  rewardType: string
  redeemPoints: number
  eligibleTiersList?: LoyaltyTier[]
  rewardValue: string
  numericRewardValue: number
  frequencyLimit?: number
  enableFrequencyLimit?: boolean
  bounds: {
    rewardId: string
    subtotal: {
      greaterThanOrEqualTo: number
    }
  }
}

export interface UpcomingReward extends Reward {
  pointsNeeded?: number
}

export interface CustomerLoyaltyResponse {
  uid?: string
  userId?: string
  availablePoints?: number
  loyaltyTierName?: string
  loyaltyTierId?: LoyaltyTier
  loyaltyEnrollTime: string
  referralCode?: string
  redeemedPoints?: number
  tierDetails?: {
    points?: number
    bonusMultipler?: number
  }
  expirationSchedule?: PointExpirationResponse[]
  userStats?: string
  hasOptedOut?: boolean
  pendingPoints?: number
  awardedPoints?: number
  referralUrl?: string
  currentRewards?: Reward[]
  nextReward?: UpcomingReward
  eligibleActivities?: Activity[]
  nextTier?: {
    pointsNeeded?: number
    name?: string
    id?: LoyaltyTier
    unitLabel?: string
    unitLabelPos?: 'pre' | 'post'
    unitFormat?: string
    unitFormatPos?: 'pre' | 'post'
    unitsNeeded?: number
  }
  userStatus?: string
}

export type ActivityRuleTypes = 'frequency'

export interface Activity {
  id?: ActivityId
  pointsEarningDescription?: string
  rules?: Record<ActivityRuleTypes, ActivityRule>
  isAvailableToUser?: boolean
  name?: string
  type?: string
  description?: string
  points?: number
  bonusMultiplier?: number
}

export interface ActivityRule {
  range?: string
  limit?: string
  actionsCompleted?: number
}
