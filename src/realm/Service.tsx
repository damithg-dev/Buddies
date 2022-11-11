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
  create: (buddy: IBuddy) => void;
  update: (id: IBuddy['id']) => void;
  delete: (id: IBuddy['id']) => void;
};

const BuddyContext = createContext<ContextState>({
  buddies: [],
  loading: false,
  error: null,
  create: () => [],
  update: () => [],
  delete: () => [],
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
    (id: IBuddy['id']) => {
      realm.write(() => {});
    },
    [realm],
  );

  const onDelete = useCallback(
    (id: IBuddy['id']) => {
      realm.write(() => {});
    },
    [realm],
  );

  const value = useMemo(
    () => ({
      buddies,
      loading,
      error,
      create: onCreate,
      update: onUpdate,
      delete: onDelete,
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
