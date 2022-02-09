// @flow
import {Server} from "@khanacademy/wonder-blocks-core";
import {ResponseCache as ResCache} from "./util/response-cache.js";
import {RequestTracker} from "./util/request-tracking.js";

import type {ValidData, CacheEntry, ResponseCache} from "./util/types.js";

export type {Cache, CacheEntry, Result, ResponseCache} from "./util/types.js";

export const initializeCache = (source: ResponseCache): void =>
    ResCache.Default.initialize(source);

export const fulfillAllDataRequests = (): Promise<ResponseCache> => {
    if (!Server.isServerSide()) {
        return Promise.reject(
            new Error("Data requests are not tracked when client-side"),
        );
    }
    return RequestTracker.Default.fulfillTrackedRequests();
};

export const hasUnfulfilledRequests = (): boolean => {
    if (!Server.isServerSide()) {
        throw new Error("Data requests are not tracked when client-side");
    }
    return RequestTracker.Default.hasUnfulfilledRequests;
};

export const removeFromCache = (id: string): boolean =>
    ResCache.Default.remove(id);

export const removeAllFromCache = (
    predicate?: (
        key: string,
        cacheEntry: ?$ReadOnly<CacheEntry<ValidData>>,
    ) => boolean,
): number => ResCache.Default.removeAll(predicate);

export {default as TrackData} from "./components/track-data.js";
export {default as Data} from "./components/data.js";
export {default as InterceptData} from "./components/intercept-data.js";
export {useServerEffect} from "./hooks/use-server-effect.js";

// GraphQL
export {GqlRouter} from "./components/gql-router.js";
export {useGql} from "./hooks/use-gql.js";
export * from "./util/gql-error.js";
export type {
    GqlContext,
    GqlOperation,
    GqlOperationType,
    GqlFetchOptions,
    GqlFetchFn,
} from "./util/gql-types.js";
