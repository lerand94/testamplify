import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerArchives = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Archives, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly image?: string | null;
  readonly archive: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyArchives = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Archives, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly image?: string | null;
  readonly archive: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Archives = LazyLoading extends LazyLoadingDisabled ? EagerArchives : LazyArchives

export declare const Archives: (new (init: ModelInit<Archives>) => Archives) & {
  copyOf(source: Archives, mutator: (draft: MutableModel<Archives>) => MutableModel<Archives> | void): Archives;
}

type EagerPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly body?: string | null;
  readonly images?: (string | null)[] | null;
  readonly date?: string | null;
  readonly link?: string | null;
  readonly linkFan?: string | null;
  readonly country?: string | null;
  readonly archive?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPost = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Post, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly body?: string | null;
  readonly images?: (string | null)[] | null;
  readonly date?: string | null;
  readonly link?: string | null;
  readonly linkFan?: string | null;
  readonly country?: string | null;
  readonly archive?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Post = LazyLoading extends LazyLoadingDisabled ? EagerPost : LazyPost

export declare const Post: (new (init: ModelInit<Post>) => Post) & {
  copyOf(source: Post, mutator: (draft: MutableModel<Post>) => MutableModel<Post> | void): Post;
}