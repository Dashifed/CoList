<template>
  <div>
    <div id="sidebar">
      <div class="sidebar-content">
        <div class="sidebar-tile">
          <div class="sidebar-title"><router-link class="sidebar-name" to="/profile/today"><div class="sidebar-name">Today</div></router-link></div>
        </div>
        <div class="sidebar-tile">
          <div class="sidebar-title"><router-link class="sidebar-name" to="/profile/tomorrow"><div class="sidebar-name">Tomorrow</div></router-link></div>
        </div>
      </div>
    </div>
    <div>
      <img :src="$auth.user.picture">
      <h2>{{ $auth.user.name }}</h2>
      <p>{{ $auth.user.email }}</p>
    </div>
    <div>
      <pre>{{ JSON.stringify($auth.user, null, 2) }}</pre>
    </div>
    <div><router-view></router-view></div>
  </div>
</template>
<style>

#sidebar {
  background: #fafafa;
  transition: box-shadow 300ms ease-in 0s;
  width: 305px;
  height: calc(100vh - 40px);
  margin: 0;
  box-sizing: border-box;
  position: absolute;
}
.sidebar-content {
  display: block;
  text-align: left;
  box-sizing: border-box;
  padding-left: 20px;
  padding-top: 20px;
}
.sidebar-tile {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  box-sizing: border-box;
  line-height: 1.5;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
}
.sidebar-tile:hover {
  background: #ececec;
}
.sidebar-title {
  padding-left: 10px;
}
.sidebar-name {
  outline: none;
  text-decoration: none;
  color: #2c3e50;
}
</style>