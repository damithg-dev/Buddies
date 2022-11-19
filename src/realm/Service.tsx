import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {BuddyRealmContext} from './index';
import {Buddy, SchemaKey} from './Schema';
const {useRealm} = BuddyRealmContext;

type ContextState = {
  buddies: IBuddy[];
  loading: boolean;
  error: Error | null;
  onCreate: (buddy: IBuddy) => void;
  onUpdate: (buddy: IBuddy) => void;
  onDelete: (buddy: IBuddy) => void;
};

const BuddyContext = createContext<ContextState>({
  buddies: [],
  loading: false,
  error: null,
  onCreate: () => [],
  onUpdate: () => [],
  onDelete: () => [],
});

export const BuddiesProvider = ({...rest}) => {
  const realm = useRealm();

  const [buddies, setBuddies] = useState<IBuddy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const _buddies = realm.objects(SchemaKey.Buddy);
    setBuddies(_buddies as unknown as IBuddy[]);
  }, [realm, reload]);

  const onCreate = useCallback(
    (_buddy: IBuddy): IBuddy[] => {
      try {
        realm.write(() => {
          realm.create(SchemaKey.Buddy, new Buddy(_buddy));
        });
      } catch (e) {
        console.error(e);
      }
      setReload(!reload);
      return buddies;
    },
    [reload, buddies, realm],
  );

  const onUpdate = useCallback(
    (_buddy: IBuddy) => {
      try {
        realm.write(() => {
          realm.create(
            SchemaKey.Buddy,
            new Buddy(_buddy),
            Realm.UpdateMode.Modified,
          );
        });
      } catch (e) {
        console.error(e);
      }
      setReload(!reload);
      return buddies;
    },
    [buddies, realm, reload],
  );

  const onDelete = useCallback(
    (_buddy: IBuddy) => {
      try {
        realm.write(() => realm.delete(_buddy));
        setReload(!reload);
      } catch (e) {
        console.log(e);
      }
    },
    [realm, reload],
  );

  const value = useMemo(
    () => ({
      buddies,
      loading,
      error,
      onCreate,
      onUpdate,
      onDelete,
    }),
    [buddies, loading, error, onCreate, onUpdate, onDelete],
  );

  return <BuddyContext.Provider value={value} {...rest} />;
};

export const useService = () => {
  const context = React.useContext(BuddyContext);
  if (context === undefined) {
    throw new Error('useService must be used within an BuddyContext');
  }
  return context;
};
