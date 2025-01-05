import React, { useState, useEffect } from 'react'
import { onSnapshot, collection, DocumentData, query, CollectionReference, Query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from "../firebase.ts"
import { useAppSelector } from '../app/hooks.ts';

interface Messages{
    timestamp: Timestamp;
    message: string;
    user:{
      uid: string;
      photo: string;
      email: string;
      displayName: string;
    };
  };

function useSubCollection(collectionName: string, subCollectionName: string) {
    const [ subDocuments, setSubDocuments ] = useState<Messages[]>([]);
    const channelId = useAppSelector((state) => state.channel.channelId);

    useEffect(() => {
        let collectionRef = collection(
          db,
          collectionName,
          String(channelId),
          subCollectionName
        );
    
        const collectionRefOrderby = query(
          collectionRef, 
          orderBy("timestamp","asc")
        );
    
        onSnapshot(collectionRefOrderby, (snapshot) => {
          let results: Messages[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({
              timestamp: doc.data().timestamp,
              message: doc.data().message,
              user: doc.data().user,
            });
          });
          setSubDocuments(results);
        });
      },[channelId])
    

  return { subDocuments };
}

export default useSubCollection
