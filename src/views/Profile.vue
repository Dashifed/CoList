<template>
  <div>
    <div id="nav">
      <span class="material-icons md-24" id="sidebar-toggle" v-on:click="toggle = !toggle">menu</span>
    </div>
    <div id="sidebar" v-show="toggle">
      <div class="sidebar-content">
        <div class="sidebar-tile">
          <router-link class="sidebar-name" to="/profile">All</router-link>
        </div>
        <div class="sidebar-tile">
          <router-link class="sidebar-name" to="/profile/today">Today</router-link>
        </div>
        <div class="sidebar-tile">
          <router-link class="sidebar-name" to="/profile/tomorrow">Tomorrow</router-link>
        </div>
      </div>
    </div>
    <div id="main-area">
      <to-do-form @todo-added="addToDo"></to-do-form>
      <router-view></router-view>
      <ul class="task-list-items">
        <to-do v-for="(item, index) in itemsFilter" 
        :id="item.id" :label="item.label" 
        :key="item.id" :done="item.done" 
        @checkbox-changed="updateDoneStatus(item.id)"
        @remove="removeTodo(index)"  
        @item-edited="editToDo(item.id, $event)" 
        class="task-list-item"></to-do>
      </ul>
      <div class="completed-items">
        <h1>Completed</h1>
        <ul class="task-list-items">
          <to-do v-for="(item, index) in itemsNotFilter" 
          :id="item.id" :label="item.label" 
          :key="item.id" :done="item.done" 
          @checkbox-changed="updateDoneStatus(item.id)"
          @remove="removeTodo(index)"  
          @item-edited="editToDo(item.id, $event)" 
          class="task-list-item"></to-do>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
//import axios from "axios";
import uniqueId from 'lodash.uniqueid';
import ToDo from "../components/ToDo.vue";
import ToDoForm from '../components/ToDoForm';
export default {
  components: {
    ToDo,
    ToDoForm
  },
  data() {
    return {
    toggle: true,
    ToDoItems: []
    };
  },
  methods: {
    addToDo(toDoLabel) {
      this.ToDoItems.push({id:uniqueId('todo-'), label: toDoLabel, done: false});
    },
    updateDoneStatus(toDoId) {
      const toDoToUpdate = this.ToDoItems.find(item => item.id === toDoId);
      toDoToUpdate.done = !(toDoToUpdate.done)
    },
    removeTodo(index) {
      this.ToDoItems.splice(index, 1);
    },
    editToDo(toDoId, newLabel) {
      const toDoToEdit = this.ToDoItems.find(item => item.id === toDoId);
      toDoToEdit.label = newLabel;
    }
  },
  computed: {
    itemsFilter() {
      return this.ToDoItems.filter((item) => !item.done);
    },
    itemsNotFilter() {
      return this.ToDoItems.filter((item) => item.done);
    },
  }
}

</script>
<style>
.material-icons{ 
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
}
.material-icons.md-18 { font-size: 18px; }
.material-icons.md-24 { font-size: 24px; }
.material-icons.md-36 { font-size: 36px; }
.material-icons.md-48 { font-size: 48px; }
#main-area {
  padding-top: 36px;
}
#nav {
  display: flex;
  height: 40px;
  align-items: space-between;
  line-height: 40px;
  background-color: #506578;
  padding-left: 35px;
  padding-right: 35px;
  align-items: center;
}

#nav a {
  font-weight: bold;
  color: #42b983;
  text-decoration: none;
}
#sidebar {
  background: #fafafa;
  width: 305px;
  height: calc(100vh - 40px);
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  z-index: 100;
}
#sidebar-toggle {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}
a.router-link-exact-active {
  background: #ececec;
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
  border-radius: 5px;
}
.sidebar-tile:hover {
  background: #ececec;
}
.sidebar-name {
  display: block;
  outline: none;
  text-decoration: none;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  padding: 5px;
  padding-left: 10px;
  box-sizing: border-box;
  line-height: 1.5;
  cursor: pointer;
  border-radius: 5px;
}
.task-list-items {
  display: grid;
  align-items: center;
  justify-content: center;
}
.task-list-item {
  display: flex;
  position: relative;
  align-items: stretch;
  width: 50vw;
  height: 50px;
  font-size: 14px;
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  cursor: pointer;
  outline: none;
  border-bottom: 1px solid #f0f0f0;
  z-index: 50;
}
</style>