import { Analytics, Event, PageHit } from "expo-analytics";
// @ts-ignore
import ExpoMixpanelAnalytics from "expo-mixpanel-analytics";

const ga = new Analytics("UA-43072488-4", undefined, { debug: __DEV__ });

const mixpanel = new ExpoMixpanelAnalytics("f3b829bced93a826d535abd48077fb28");

const analytics = {
  identify(id: string): void {
    mixpanel.identify(id);
    // @ts-ignore
    ga.parameters.uid = id;
  },

  // tslint:disable-next-line:no-any
  async track(name: string, props: Record<string, any>): Promise<void> {
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
