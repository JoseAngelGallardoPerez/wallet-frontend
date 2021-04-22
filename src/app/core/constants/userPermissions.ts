export enum UserPermissions {  // 29 (30)
  EXECUTE_CANCEL_PENDING_TRANSFER_REQUEST = 'execute_cancel_pending_transfer_requests',
  APPROVE_CANCEL_REGISTRATION_REQUESTS = 'approve_cancel_registration_requests',
  IMPORT_TRANSFER_REQUEST_UPDATES = 'import_transfer_request_updates',

  VIEW_ACCOUNT = 'view_accounts',
  CREATE_ACCOUNT = 'create_accounts',
  CREATE_ACCOUNT_WITH_INITIAL_BALANCE = 'create_accounts_with_initial_balance',
  MODIFY_ACCOUNTS = 'modify_accounts',
  MANUAL_DEBIT_CREDIT_ACCOUNT = 'manual_debit_credit_accounts',
  VIEW_REVENUE = 'view_revenue',
  MANAGE_REVENUE = 'manage_revenue',

  VIEW_CARDS = 'view_cards',
  CREATE_CARDS = 'create_cards',
  MODIFY_CARDS = 'modify_cards',

  VIEW_USER_PROFILES = 'view_user_profiles',
  CREATE_USER_PROFILE = 'create_profile',
  MODIFY_USER_PROFILE = 'modify_user_profiles',
  GENERATE_SEND_NEW_TANS = 'generate_send_new_tans',

  VIEW_ADMIN_PROFILES = 'view_admin_profiles',
  CREATE_ADMIN_PROFILES = 'create_admin_profiles',
  MODIFY_ADMIN_PROFILE = 'modify_admin_profiles',

  VIEW_UNBLOCK_BLOCKED_PROFILES = 'view_unblock_blocked_profiles',

  INITIATE_EXECUTE_USER_TRANSFER = 'initiate_execute_user_transfers',

  SEND_REPLY_INITIAL_MESSAGE = 'send_reply_internal_messages',

  CREATE_MODIFY_NEWS_ARTICLES = 'create_modify_news_articles',

  VIEW_SYSTEM_LOG = 'view_system_log',

  VIEW_SETTINGS = 'view_settings',
  MODIFY_SETTINGS = 'modify_settings',
  CREATE_SETTINGS = 'create_settings',
  REMOVE_SETTINGS = 'remove_settings',
  MODIFY_ACCOUNT_TYPES = 'modify_account_types',
  CREATE_MODIFY_IWT_BANK_ACCOUNTS = 'create_modify_iwt_bank_accounts',

  VIEW_USER_REPORTS = 'view_user_reports',
  VIEW_GENERAL_SYSTEM_REPORTS = 'view_general_system_reports',
  LIST_SCHEDULED_TRANSACTIONS = 'list_scheduled_transactions',
}
