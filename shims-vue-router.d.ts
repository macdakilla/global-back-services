import "vue-router";

declare module "vue-router" {
  interface RouteMeta {
    title: string;
    need?: {
      groups?: string[];
    };
    icon?: NodeRequire;
    activeIcon?: NodeRequire;
  }
}
