<script lang="ts">
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import { friendsStore, screenStore } from "../stores";
  import AddFriend from "./AddFriend.svelte";
  import ChatScreen from "./ChatScreen.svelte";
  import CallScreen from "./CallScreen.svelte";

  let selectedMenu: string;
  let friends: { [pub: string]: FriendProfile } = {};
  $: friend = friends[selectedMenu];
  $: selectedMenu;
  $: onCall = get(screenStore.currentActiveCall);
  onMount(async () => {
    screenStore.selectedChatMenu.subscribe((v) => (selectedMenu = v));
    friendsStore.subscribe((v) => (friends = v));
  });
</script>

<div class="w-full h-full">
  {#if selectedMenu === ":calls:" && onCall}
    <div class="flex flex-row h-full">
      <CallScreen friend={friend} />
    </div>
  {:else if selectedMenu === ":calls:"}
    <div class="flex flex-row h-full">
      <!-- <CallHistory /> -->
    </div>
  {:else if selectedMenu === ":addFriend:" || !friend}
    <AddFriend />
  {:else}
    <ChatScreen {friend} />
  {/if}
</div>
