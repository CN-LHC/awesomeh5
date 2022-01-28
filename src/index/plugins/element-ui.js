import Vue from "vue";
import {
  Card,
  Tree,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  InputNumber,
  Select,
  Tabs,
  TabPane,
  Option,
  OptionGroup,
  Tooltip,
  Dialog,
  Form,
  FormItem,
  Switch,
  Radio,
  RadioGroup,
  RadioButton,
  Upload,
  Button,
  MessageBox,
  Message,
  Menu,
  Submenu,
  MenuItem,
  Loading,
  Table,
  TableColumn,
  InfiniteScroll,
  Image,
  DatePicker,
  Progress,
  MenuItemGroup,
  Col,
  Row,
  Avatar,
  Backtop,
  ButtonGroup,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Autocomplete,
  ColorPicker,
  Slider,
  Popover,
  Tag,
  PageHeader
  // Notification
} from "element-ui";
//默认皮肤
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Card);
Vue.use(Tree);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Tooltip);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(InfiniteScroll);
Vue.use(Image);
Vue.use(DatePicker);
Vue.use(Progress);
Vue.use(Col);
Vue.use(Row);
Vue.use(Avatar);
Vue.use(Backtop);
Vue.use(ButtonGroup);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Loading.directive);
Vue.use(Autocomplete);
Vue.use(ColorPicker);
Vue.use(Slider);
Vue.use(Popover);
Vue.use(Tag);
Vue.use(PageHeader);
// Vue.use(Notification);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$loading = Loading.service;
// Vue.prototype.$notification = Notification;