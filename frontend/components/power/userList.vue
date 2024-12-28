<template>
  <div class="w-full">
    <!-- <h2 class="font-semibold text-base text-white  leading-7">Latest activity</h2> -->
    <table class="text-left w-full whitespace-nowrap">
      <colgroup>
        <col class="w-1/12" />
        <col class="w-full w-8/12" />
        <col class="w-2/12" />
        <col class="w-1/12" />
      </colgroup>
      <thead class="border-b border-white/10 text-sm text-white leading-6">
        <tr>
          <th scope="col" class="font-semibold py-2 pr-6 pl-1 sm:pl-2 lg:pl-4">Rank</th>
          <th scope="col" class="font-semibold py-2 pr-8 pl-0 hidden sm:table-cell">
            Name
          </th>
          <th scope="col" class="font-semibold text-right py-2 pr-4 pl-0 hidden sm:pr-6 sm:table-cell lg:pr-8">
            Price / Volume ($AI)
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-white/5">
        <tr v-for="(item, index) in activityItems" :key="item.commit">
          <td class=" text-white py-4 pr-4 pl-2 sm:pl-3 lg:pl-4">
            {{ index + 1 }}
          </td>
          <td class="py-4 pr-4">
            <div class="flex gap-x-4 items-center">
              <img :src="item.user.imageUrl" alt="" class="rounded-lg bg-gray-800 h-16 w-16" />
              <div class="font-medium text-sm text-white leading-6 _truncate">{{ item.user.name }}</div>
            </div>
          </td>
          <td class="text-right text-sm py-4 pr-4 pl-0 text-gray-400 leading-6 hidden sm:pr-6 sm:table-cell lg:pr-8">
            {{ item.price }} / {{ item.volumn }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const statuses = { Completed: 'text-green-400 bg-green-400/10', Error: 'text-rose-400 bg-rose-400/10' }
const activityItems = [
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '2d89f0c8',
    branch: 'main',
    status: 'Completed',
    duration: '25s',
    price: '12K',
    volumn: '12.34M',
    date: '45 minutes ago',
    dateTime: '2023-01-23T11:00',
  },
  {
    user: {
      name: 'Lindsay Walton',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '249df660',
    branch: 'main',
    status: 'Completed',
    duration: '1m 32s',
    price: '12K',
    volumn: '12.34M',
    date: '3 hours ago',
    dateTime: '2023-01-23T09:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '11464223',
    branch: 'main',
    status: 'Error',
    duration: '1m 4s',
    price: '12K',
    volumn: '12.34M',
    date: '12 hours ago',
    dateTime: '2023-01-23T00:00',
  },
  {
    user: {
      name: 'Courtney Henry',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: 'dad28e95',
    branch: 'main',
    status: 'Completed',
    duration: '2m 15s',
    price: '12K',
    volumn: '12.34M',
    date: '2 days ago',
    dateTime: '2023-01-21T13:00',
  },
  {
    user: {
      name: 'Michael Foster',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    commit: '624bc94c',
    branch: 'main',
    status: 'Completed',
    duration: '1m 12s',
    price: '12K',
    volumn: '12.34M',
    date: '5 days ago',
    dateTime: '2023-01-18T12:34',
  },
  // {
  //   user: {
  //     name: 'Courtney Henry',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //   },
  //   commit: 'e111f80e',
  //   branch: 'main',
  //   status: 'Completed',
  //   duration: '1m 56s',
  //   price: '12K',
  //   volumn: '12.34M',
  //   date: '1 week ago',
  //   dateTime: '2023-01-16T15:54',
  // },
  // {
  //   user: {
  //     name: 'Michael Foster',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //   },
  //   commit: '5e136005',
  //   branch: 'main',
  //   status: 'Completed',
  //   duration: '3m 45s',
  //   price: '12K',
  //   volumn: '12.34M',
  //   date: '1 week ago',
  //   dateTime: '2023-01-16T11:31',
  // },
  // {
  //   user: {
  //     name: 'Whitney Francis',
  //     imageUrl:
  //       'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  //   },
  //   commit: '5c1fd07f',
  //   branch: 'main',
  //   status: 'Completed',
  //   duration: '37s',
  //   price: '12K',
  //   volumn: '12.34M',
  //   date: '2 weeks ago',
  //   dateTime: '2023-01-09T08:45',
  // },
]
</script>