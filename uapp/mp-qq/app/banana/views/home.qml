<block qq:if="{{dataSource}}"><view class="home data-v-68f0f0f2"><swiper class="swiper data-v-68f0f0f2" indicator-dots autoplay="{{false}}" circular interval="{{5000}}"><block qq:for="{{v2sliderows}}" qq:for-item="item" qq:for-index="index" qq:key="index"><swiper-item data-event-opts="{{[['tap',[['swiperClick',['$0'],[[['v2sliderows','',index]]]]]]]}}" class="swiperItem data-v-68f0f0f2" bindtap="__e"><image class="image data-v-68f0f0f2" src="{{item.pic}}" mode="widthFix"></image><text class="data-v-68f0f0f2">{{item.title}}</text></swiper-item></block></swiper><list vue-id="29d483f0-1" title="香蕉头条dayrows" dataList="{{dataSource.dayrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-2" title="最新视频latestrows" dataList="{{dataSource.latestrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-3" title="猜你喜欢likerows" dataList="{{dataSource.likerows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-4" title="偷拍自拍a_vodrows" dataList="{{dataSource.a_vodrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-5" title="成人动漫b_vodrows" dataList="{{dataSource.b_vodrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-6" title="经典伦理c_vodrows" dataList="{{dataSource.c_vodrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-7" title="中文字幕d_vodrows" dataList="{{dataSource.d_vodrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-8" title="不雅视频tagvodrows" dataList="{{dataSource.tagvodrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list><list vue-id="29d483f0-9" title="热片视频hotrows" dataList="{{dataSource.hotrows}}" class="data-v-68f0f0f2" bind:__l="__l"></list></view></block>