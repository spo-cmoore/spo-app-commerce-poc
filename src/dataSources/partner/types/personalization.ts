export interface ShoppingStylePreferenceOption {
  optionId: string
  selected: boolean
}

export interface ShoppingStylePreferences {
  promptId: string
  values: ShoppingStylePreferenceOption[]
}

export type StylePreferencesResponse = ShoppingStylePreferences[]
