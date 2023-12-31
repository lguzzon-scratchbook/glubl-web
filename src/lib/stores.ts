import type { GunPeer, IGunInstance } from "gun"
import { writable, type Readable } from "svelte/store"
import { CallController } from "./call"
import type { GroupNode } from "./circle-channel"

export const screenStore = {
  selectedChatMenu: writable<string>(),
  selectedFriendProfile: writable<FriendProfile | undefined>(),
  currentActiveCall: writable<boolean>(true)
}

export let localStreams: {[key: string]: Readable<CallController>} = {
  call: writable<CallController>(new CallController())
}
export let remoteStreams: {[key: string]: Readable<CallController>} = {}

export const menuOpen = writable(false)
export const callExpanded = writable(false)
export const gunStore = writable<IGunInstance<any>>()
export const localGunStore = writable<IGunInstance<any>>()
export const friendsStore = writable<{[pub: string]: FriendProfile}>({})
export const friendRTCStore = writable<Map<string, GunPeer>>(new Map())
export const myProfileStore = writable<FriendProfile | undefined>()
export const callFriendStore = writable<{[pub: string]: FriendProfile}>({})
export const friendChannelStore = writable<{[pub: string]: GroupNode}>({})

export function clear() {
  screenStore.selectedChatMenu.set("")
  screenStore.selectedFriendProfile.set(undefined)
  screenStore.currentActiveCall.set(false)
  menuOpen.set(false)
  friendsStore.set({})
  myProfileStore.set(undefined)
}