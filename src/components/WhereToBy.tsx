import { StoreID } from "../entities/Store";
import {
  epicGames,
  playStation,
  playStore,
  steam,
  xbox,
  appStore,
  itchIO,
  gog,
  nintendo,
} from "../assets/storeIcon";

interface Props {
  stores: StoreID[];
}

const slugToLogoMap: Record<string, JSX.Element> = {
  steam: steam,
  "playstation-store": playStation,
  "xbox-store": xbox,
  "apple-appstore": appStore,
  gog: gog,
  nintendo: nintendo,
  xbox360: xbox,
  "google-play": playStore,
  itch: itchIO,
  "epic-games": epicGames,
};

const WhereToBy = ({ stores }: Props) => {
  return (
    <div className="mt-5">
      <h1 className="p-2">Where to by</h1>
      <div className="container mt-4">
        <div className="row">
          {stores.map((store, index) => (
            <div key={index} className="col-12 col-md-6 mb-3">
              <a
                href={`https://${store.store.domain}`}
                className="store-button d-flex align-items-center justify-content-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {store.store.name}
                {slugToLogoMap[store.store.slug]}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhereToBy;
