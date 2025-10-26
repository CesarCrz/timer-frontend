// Subscription Tiers
export interface SubscriptionTier {
  id: string
  name: string
  price_monthly: number
  price_yearly: number
  max_branches: number
  max_employees: number
  features: string[]
  is_popular?: boolean
}

// Contact Form
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  business_name?: string
  message: string
}

// API Response
export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

// FAQ Item
export interface FAQItem {
  question: string
  answer: string
}

// Feature Item
export interface FeatureItem {
  icon: string
  title: string
  description: string
}
