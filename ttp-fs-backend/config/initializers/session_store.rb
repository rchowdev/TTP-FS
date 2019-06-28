Rails.application.config.session_store :cookie_store,
  :key => "_ttp_fs_app",
  :expire_after => 4.hours,
  :http_only => true,
  :secure => true
