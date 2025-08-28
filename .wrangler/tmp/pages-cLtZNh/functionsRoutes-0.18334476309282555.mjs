import { onRequestPost as __api_chat_ts_onRequestPost } from "/home/insight/insight_hunter_demo/functions/api/chat.ts"
import { onRequestGet as __api_notify_ts_onRequestGet } from "/home/insight/insight_hunter_demo/functions/api/notify.ts"
import { onRequestPost as __api_notify_ts_onRequestPost } from "/home/insight/insight_hunter_demo/functions/api/notify.ts"
import { onRequestPost as __api_plan_ts_onRequestPost } from "/home/insight/insight_hunter_demo/functions/api/plan.ts"
import { onRequest as __api_alerts_ts_onRequest } from "/home/insight/insight_hunter_demo/functions/api/alerts.ts"
import { onRequest as __api_profiles_ts_onRequest } from "/home/insight/insight_hunter_demo/functions/api/profiles.ts"
import { onRequest as __api_settings_ts_onRequest } from "/home/insight/insight_hunter_demo/functions/api/settings.ts"
import { onRequest as __api___path___ts_onRequest } from "/home/insight/insight_hunter_demo/functions/api/[[path]].ts"
import { onRequest as __api_index_ts_onRequest } from "/home/insight/insight_hunter_demo/functions/api/index.ts"
import { onRequest as ___middleware_ts_onRequest } from "/home/insight/insight_hunter_demo/functions/_middleware.ts"

export const routes = [
    {
      routePath: "/api/chat",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_chat_ts_onRequestPost],
    },
  {
      routePath: "/api/notify",
      mountPath: "/api",
      method: "GET",
      middlewares: [],
      modules: [__api_notify_ts_onRequestGet],
    },
  {
      routePath: "/api/notify",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_notify_ts_onRequestPost],
    },
  {
      routePath: "/api/plan",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_plan_ts_onRequestPost],
    },
  {
      routePath: "/api/alerts",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_alerts_ts_onRequest],
    },
  {
      routePath: "/api/profiles",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_profiles_ts_onRequest],
    },
  {
      routePath: "/api/settings",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_settings_ts_onRequest],
    },
  {
      routePath: "/api/:path*",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api___path___ts_onRequest],
    },
  {
      routePath: "/api",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_index_ts_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_ts_onRequest],
      modules: [],
    },
  ]