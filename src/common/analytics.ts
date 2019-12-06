import { Analytics, Event, PageHit } from "expo-analytics";
// @ts-ignore
import ExpoMixpanelAnalytics from "expo-mixpanel-analytics";
import { config } from "../config";

const ga = __DEV__
  ? // tslint:disable-next-line:no-any
    ({} as any)
  : new Analytics(config.analytics.googleTid, undefined, {
      debug: __DEV__
    });

const mixpanel = __DEV__
  ? // tslint:disable-next-line:no-any
    ({} as any)
  : new ExpoMixpanelAnalytics(config.analytics.mixpanelProjectToken);

const analytics = {
  identify(id: string): void {
    if (__DEV__) {
      return;
    }

    mixpanel.identify(id);
    // @ts-ignore
    ga.parameters.uid = id;
  },

  // tslint:disable-next-line:no-any
  async track(name: string, props: Record<string, any>): Promise<void> {
    if (__DEV__) {
      return;
    }

    mixpanel.track(name, props);
    if (name.startsWith("page_view_")) {
      await ga.hit(new PageHit(name));
    } else if (name.startsWith("tap_")) {
      await ga.event(new Event("tap", name, props.id));
    } else {
      await ga.event(new Event(name, name));
    }
  },

  people_delete_user(): void {
    mixpanel.people_delete_user();
  }
};

export { analytics };
