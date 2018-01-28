webpackJsonp([0],{

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map = __webpack_require__(123);

var _map2 = _interopRequireDefault(_map);

var _copiedBranch = __webpack_require__(127);

var _copiedBranch2 = _interopRequireDefault(_copiedBranch);

var _selectedId = __webpack_require__(128);

var _selectedId2 = _interopRequireDefault(_selectedId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    map: _map.initialMap,
    copiedBranch: _copiedBranch.initialCopiedBranch,
    selectedId: _selectedId.initialSelectedId
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];
    return {
        map: (0, _map2.default)(state.map, action, state),
        copiedBranch: (0, _copiedBranch2.default)(state.copiedBranch, action, state),
        selectedId: (0, _selectedId2.default)(state.selectedId, action, state)
    };
};

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialMap = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = __webpack_require__(58);

var _v2 = _interopRequireDefault(_v);

var _item = __webpack_require__(126);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var genNewItem = function genNewItem(item) {
    var defaultItem = {
        id: (0, _v2.default)(),
        text: '',
        childIds: [],
        parentId: '',
        numberChild: false
    };
    return _extends({}, defaultItem, item);
};

var initialMap = {
    '0': {
        id: '0',
        text: 'My Mind Map :)',
        childIds: [],
        parentId: ''
    }
};

var addSiblings = function addSiblings(map, id, ifAddBefore) {
    var _extends2;

    var commonParentId = map[id].parentId,
        commonParent = map[commonParentId],
        newItemIdIndex = commonParent.childIds.indexOf(id) + (ifAddBefore ? 0 : 1),
        updatedChildIdsOfParent = [].concat(_toConsumableArray(commonParent.childIds));

    var newItem = genNewItem({ parentId: commonParentId });

    updatedChildIdsOfParent.splice(newItemIdIndex, 0, newItem.id);

    return _extends({}, map, (_extends2 = {}, _defineProperty(_extends2, commonParentId, _extends({}, commonParent, {
        childIds: updatedChildIdsOfParent
    })), _defineProperty(_extends2, newItem.id, newItem), _extends2));
};

var addParent = function addParent(map, id) {
    var _extends3;

    var currParentId = map[id].parentId,
        currParent = map[currParentId],
        idIndex = currParent.childIds.indexOf(id),
        updatedChildIdsOfParent = [].concat(_toConsumableArray(currParent.childIds));

    var newParentItem = genNewItem({
        parentId: currParentId,
        childIds: [id]
    });

    updatedChildIdsOfParent.splice(idIndex, 1, newParentItem.id);

    return _extends({}, map, (_extends3 = {}, _defineProperty(_extends3, currParentId, _extends({}, currParent, {
        childIds: updatedChildIdsOfParent
    })), _defineProperty(_extends3, id, _extends({}, map[id], {
        parentId: newParentItem.id
    })), _defineProperty(_extends3, newParentItem.id, newParentItem), _extends3));
};

var addChild = function addChild(map, id) {
    var _extends4;

    var newChildItem = genNewItem({ parentId: id });
    var updatedChildIds = [].concat(_toConsumableArray(map[id].childIds));

    updatedChildIds.push(newChildItem.id);

    return _extends({}, map, (_extends4 = {}, _defineProperty(_extends4, id, _extends({}, map[id], {
        childIds: updatedChildIds
    })), _defineProperty(_extends4, newChildItem.id, newChildItem), _extends4));
};

var getDescendantIds = function getDescendantIds(rootId, map) {
    return map[rootId].childIds.reduce(function (descendantIds, id) {
        return [].concat(_toConsumableArray(descendantIds), [id, getDescendantIds(id, map)]);
    }, []);
};

var deleteElFromArr = function deleteElFromArr(arr, el) {
    var elIndex = arr.indexOf(el);
    return [].concat(_toConsumableArray(arr.slice(0, elIndex)), _toConsumableArray(arr.slice(elIndex + 1)));
};

var map = function map() {
    var map = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialMap;

    var _extends6;

    var action = arguments[1];
    var state = arguments[2];

    switch (action.type) {
        case 'EDIT_ITEM':
        case 'NUMBER_CHILD':
            return _extends({}, map, _defineProperty({}, action.id, (0, _item2.default)(map[action.id], action)));
        case 'ADD_ITEM_BEFORE':
            return addSiblings(map, action.id, true);
        case 'ADD_ITEM_AFTER':
            return addSiblings(map, action.id);
        case 'ADD_PARENT_ITEM':
            return addParent(map, action.id);
        case 'ADD_CHILD_ITEM':
            return addChild(map, action.id);
        case 'PASTE':
            var copiedBranch = state.copiedBranch,
                selectedId = state.selectedId;

            if (copiedBranch.rootId === '') return map;

            return _extends({}, map, copiedBranch.items, (_extends6 = {}, _defineProperty(_extends6, copiedBranch.rootId, _extends({}, copiedBranch.items[copiedBranch.rootId], { parentId: selectedId })), _defineProperty(_extends6, selectedId, _extends({}, map[selectedId], { childIds: [].concat(_toConsumableArray(map[selectedId].childIds), [copiedBranch.rootId]) })), _extends6));
        case 'CUT':
        case 'REMOVE':
            map = _extends({}, map);
            var parentId = map[action.id].parentId,
                deleteIds = [action.id].concat(_toConsumableArray(getDescendantIds(action.id, map)));

            deleteIds.forEach(function (id) {
                return delete map[id];
            });
            return _extends({}, map, _defineProperty({}, parentId, _extends({}, map[parentId], { childIds: deleteElFromArr(map[parentId].childIds, action.id) })));
        default:
            return map;
    }
};

exports.default = map;
exports.initialMap = initialMap;

/***/ }),

/***/ 126:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var item = function item(_item, action) {
    switch (action.type) {
        case 'EDIT_ITEM':
            return _extends({}, _item, { text: action.text });
        case 'NUMBER_CHILD':
            return _extends({}, _item, { numberChild: !_item.numberChild });
        default:
            return _item;
    }
};

exports.default = item;

/***/ }),

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialCopiedBranch = exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = __webpack_require__(58);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialCopiedBranch = {
    rootId: '',
    items: {}
};

var renewIdsInItem = function renewIdsInItem(item, parentId, id) {
    return _extends({}, item, {
        parentId: parentId,
        id: id || (0, _v2.default)(),
        childIds: item.childIds.map(function (oldId) {
            return (0, _v2.default)();
        })
    });
};

var genMapBetween2Array = function genMapBetween2Array(arr1, arr2) {
    return new Map(arr1.map(function (el, i) {
        return [el, arr2[i]];
    }));
};

var copyDescendants = function copyDescendants(rootItem, newRootItem, map) {
    var mapOfChildIds = genMapBetween2Array(rootItem.childIds, newRootItem.childIds);

    return rootItem.childIds.reduce(function (descendants, id) {
        var newChildItem = _extends({}, renewIdsInItem(map[id], newRootItem.id, mapOfChildIds.get(id)));
        return _extends({}, descendants, _defineProperty({}, newChildItem.id, newChildItem), copyDescendants(map[id], newChildItem, map));
    }, {});
};

var copiedBranch = function copiedBranch() {
    var copiedBranch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialCopiedBranch;
    var action = arguments[1];
    var state = arguments[2];

    if (action.type === 'COPY' || action.type === 'CUT') {
        var rootId = action.id,
            rootItem = state.map[rootId],
            newRootItem = renewIdsInItem(rootItem, '');
        return {
            rootId: newRootItem.id,
            items: _extends(_defineProperty({}, newRootItem.id, newRootItem), copyDescendants(rootItem, newRootItem, state.map))
        };
    } else if (action.type === 'PASTE') {
        if (copiedBranch.rootId === '') return copiedBranch;

        var _rootItem = copiedBranch.items[copiedBranch.rootId],
            _newRootItem = renewIdsInItem(_rootItem, '');
        return {
            rootId: _newRootItem.id,
            items: _extends(_defineProperty({}, _newRootItem.id, _newRootItem), copyDescendants(_rootItem, _newRootItem, copiedBranch.items))
        };
    } else {
        return copiedBranch;
    }
};

exports.default = copiedBranch;
exports.initialCopiedBranch = initialCopiedBranch;

/***/ }),

/***/ 128:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var initialSelectedId = '';

var selectedId = function selectedId() {
    var selectedId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialSelectedId;
    var action = arguments[1];
    var state = arguments[2];

    if (action.type === 'SELECT_ITEM') {
        return action.id || '';
    } else if (action.type === 'CUT' || action.type === 'REMOVE') {
        return '';
    } else {
        return selectedId;
    }
};

exports.default = selectedId;
exports.initialSelectedId = initialSelectedId;

/***/ }),

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(9);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _map = __webpack_require__(253);

var _map2 = _interopRequireDefault(_map);

var _tools = __webpack_require__(262);

var _tools2 = _interopRequireDefault(_tools);

var _map3 = __webpack_require__(83);

var _map4 = _interopRequireDefault(_map3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App() {
    return _react2.default.createElement(
        'div',
        { id: 'app-root' },
        _react2.default.createElement(_map2.default, null),
        _react2.default.createElement(_tools2.default, null)
    );
};

exports.default = App;

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var selectItem = function selectItem(id) {
    return {
        type: 'SELECT_ITEM',
        id: id
    };
};

var editItem = function editItem(id, text) {
    return {
        type: 'EDIT_ITEM',
        id: id,
        text: text
    };
};

var addItem = {
    BEFORE: function BEFORE(id) {
        return {
            type: 'ADD_ITEM_BEFORE',
            id: id
        };
    },
    AFTER: function AFTER(id) {
        return {
            type: 'ADD_ITEM_AFTER',
            id: id
        };
    },
    PARENT: function PARENT(id) {
        return {
            type: 'ADD_PARENT_ITEM',
            id: id
        };
    },
    CHILD: function CHILD(id) {
        return {
            type: 'ADD_CHILD_ITEM',
            id: id
        };
    }
};

var copy = function copy(id) {
    return {
        type: 'COPY',
        id: id
    };
};

var paste = function paste(id) {
    return {
        type: 'PASTE',
        id: id
    };
};

var cut = function cut(id) {
    return {
        type: 'CUT',
        id: id
    };
};

var remove = function remove(id) {
    return {
        type: 'REMOVE',
        id: id
    };
};

var numberChild = function numberChild(id) {
    return {
        type: 'NUMBER_CHILD',
        id: id
    };
};

exports.selectItem = selectItem;
exports.editItem = editItem;
exports.numberChild = numberChild;
exports.addItem = addItem;
exports.copy = copy;
exports.paste = paste;
exports.cut = cut;
exports.remove = remove;

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(9);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _branch = __webpack_require__(254);

var _branch2 = _interopRequireDefault(_branch);

var _map = __webpack_require__(83);

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Map = (0, _reactCssModules2.default)(_map2.default, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })(function () {
    return _react2.default.createElement(
        'div',
        { styleName: 'map' },
        _react2.default.createElement(_branch2.default, { id: '0', level: 0 })
    );
});

exports.default = Map;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(9);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _reactRedux = __webpack_require__(16);

var _item = __webpack_require__(255);

var _item2 = _interopRequireDefault(_item);

var _branch = __webpack_require__(261);

var _branch2 = _interopRequireDefault(_branch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Branch = function (_React$Component) {
    _inherits(Branch, _React$Component);

    function Branch() {
        _classCallCheck(this, Branch);

        return _possibleConstructorReturn(this, (Branch.__proto__ || Object.getPrototypeOf(Branch)).apply(this, arguments));
    }

    _createClass(Branch, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                map = _props.map,
                id = _props.id,
                level = _props.level,
                beNumbered = _props.beNumbered,
                parentItem = map[id];


            return _react2.default.createElement(
                'div',
                { className: id === '0' ? _branch2.default["branch-root"] : _branch2.default["branch"] },
                _react2.default.createElement(
                    'div',
                    { className: _branch2.default["parent-item"] },
                    _react2.default.createElement(_item2.default, { level: level, content: parentItem,
                        beNumbered: beNumbered }),
                    parentItem.childIds.length > 0 && _react2.default.createElement('div', { className: _branch2.default["link"] })
                ),
                parentItem.childIds.length > 0 && _react2.default.createElement(
                    'div',
                    { className: _branch2.default["child-items"] },
                    parentItem.childIds.map(function (id, index) {
                        return _react2.default.createElement(Branch, { map: map,
                            key: id, id: id,
                            beNumbered: parentItem.numberChild ? index + 1 : false,
                            level: Math.min(3, level + 1) });
                    })
                )
            );
        }
    }]);

    return Branch;
}(_react2.default.Component);

exports.default = (0, _reactRedux.connect)(function (state) {
    return state;
})(Branch);

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(9);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _reactRedux = __webpack_require__(16);

var _actions = __webpack_require__(17);

var _addBtnGrp = __webpack_require__(256);

var _addBtnGrp2 = _interopRequireDefault(_addBtnGrp);

var _item = __webpack_require__(260);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = (_dec = (0, _reactCssModules2.default)(_item2.default, { allowMultiple: true, handleNotFoundStyleName: 'ignore' }), _dec(_class = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Item);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Item.__proto__ || Object.getPrototypeOf(Item)).call.apply(_ref, [this].concat(args))), _this), _this.firstClickStamp = null, _this.clearClickStampTimer = null, _this.state = { showAddBtnGrp: false }, _this.handlePossibleExit = function (e) {
            if (e.key === 'Enter') _this.input.blur();
        }, _this.handleChange = function (e) {
            return _this.props.dispatch((0, _actions.editItem)(_this.props.content.id, e.target.value));
        }, _this.toggleMask = function () {
            return _this.mask.style.display = _this.mask.style.display === 'none' ? 'block' : 'none';
        }, _this.handleAddItem = function (type) {
            return _this.props.dispatch(_actions.addItem[type](_this.props.content.id));
        }, _this.emitEditOrSelect = function (e) {
            e.preventDefault();
            if (!_this.firstClickStamp) {
                _this.firstClickStamp = Date.now();
                _this.clearClickStampTimer = setTimeout(function () {
                    // select
                    _this.firstClickStamp = null;
                    _this.props.dispatch((0, _actions.selectItem)(_this.props.content.id));
                }, 300);
            } else {
                // edit
                clearTimeout(_this.clearClickStampTimer);
                _this.firstClickStamp = null;
                _this.toggleMask();
                _this.input.focus();
            }
        }, _this.getAddBtnColor = function (level) {
            switch (level) {
                case 0:
                    return '#4a2d5d';
                case 1:
                    return '#fbc2a4';
                case 2:
                    return '#c2e3d2';
                default:
                    return '#a39e8a';
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Item, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                content = _props.content,
                level = _props.level,
                selectedId = _props.selectedId,
                beNumbered = _props.beNumbered,
                id = content.id,
                text = content.text;


            return _react2.default.createElement(
                'div',
                { styleName: 'item-level-' + level + (selectedId === id ? '-selected' : ''),
                    onMouseEnter: function onMouseEnter() {
                        return _this2.setState({ showAddBtnGrp: true });
                    },
                    onMouseLeave: function onMouseLeave() {
                        return _this2.setState({ showAddBtnGrp: false });
                    } },
                _react2.default.createElement('textarea', { styleName: 'item-input',
                    ref: function ref(input) {
                        return _this2.input = input;
                    },
                    value: text,
                    onKeyDown: this.handlePossibleExit,
                    onChange: this.handleChange,
                    onBlur: this.toggleMask }),
                _react2.default.createElement('label', { styleName: 'item-mask',
                    ref: function ref(label) {
                        return _this2.mask = label;
                    },
                    onMouseDown: this.emitEditOrSelect }),
                _react2.default.createElement(_addBtnGrp2.default, { color: this.getAddBtnColor(level),
                    onlyRenderChildBtn: id === '0',
                    showGrp: this.state.showAddBtnGrp,
                    handleClick: this.handleAddItem }),
                text,
                beNumbered && _react2.default.createElement(
                    'div',
                    { styleName: 'item-no' },
                    beNumbered
                )
            );
        }
    }]);

    return Item;
}(_react2.default.Component)) || _class);
exports.default = (0, _reactRedux.connect)(function (state) {
    return state;
})(Item);

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _addBtn = __webpack_require__(257);

var _addBtn2 = _interopRequireDefault(_addBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddBtnGrp = function (_React$Component) {
    _inherits(AddBtnGrp, _React$Component);

    function AddBtnGrp() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AddBtnGrp);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AddBtnGrp.__proto__ || Object.getPrototypeOf(AddBtnGrp)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hoverOn: '' }, _this.handleHoverChange = function (type) {
            return _this.setState({ hoverOn: !_this.state.hoverOn ? type : '' });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AddBtnGrp, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                color = _props.color,
                onlyRenderChildBtn = _props.onlyRenderChildBtn,
                showGrp = _props.showGrp,
                _handleClick = _props.handleClick;
            var hoverOn = this.state.hoverOn;


            var btnGrp = onlyRenderChildBtn ? ['CHILD'] : ['BEFORE', 'AFTER', 'PARENT', 'CHILD'];

            return _react2.default.createElement(
                'div',
                { style: { fill: color } },
                btnGrp.map(function (type) {
                    return _react2.default.createElement(_addBtn2.default, { key: type,
                        type: type,
                        show: showGrp && hoverOn === '' || hoverOn === type,
                        handleToggleHide: _this2.handleHoverChange,
                        handleClick: function handleClick() {
                            return _handleClick(type);
                        } });
                })
            );
        }
    }]);

    return AddBtnGrp;
}(_react2.default.Component);

exports.default = AddBtnGrp;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(9);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _addBtn = __webpack_require__(258);

var _addBtn2 = _interopRequireDefault(_addBtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddBtn = (0, _reactCssModules2.default)(_addBtn2.default, { allowMultiple: true, handleNotFoundStyleName: 'ignore' })(function (_ref) {
    var type = _ref.type,
        show = _ref.show,
        handleToggleHide = _ref.handleToggleHide,
        handleClick = _ref.handleClick;
    return _react2.default.createElement(
        'div',
        { styleName: 'add-' + type.toLowerCase(),
            style: { display: show ? 'block' : 'none' },
            onMouseEnter: function onMouseEnter() {
                return handleToggleHide(type);
            },
            onMouseLeave: function onMouseLeave() {
                return handleToggleHide(type);
            },
            onClick: function onClick() {
                return handleClick(type);
            } },
        _react2.default.createElement(
            'svg',
            { viewBox: btn[type].viewBox, version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('path', { d: btn[type].path })
        )
    );
});

var btn = {
    BEFORE: {
        viewBox: '0 0 48 24',
        path: 'M19.774 15.407l-1.294-1.294 5.519-5.519 5.519 5.519-1.294 1.294-4.226-4.226z'
    },
    AFTER: {
        viewBox: '0 0 48 24',
        path: 'M19.774 8.593l4.226 4.226 4.226-4.226 1.294 1.294-5.52 5.52-5.52-5.52z'
    },
    PARENT: {
        viewBox: '0 0 24 48',
        path: 'M15.704 28.594l-1.406 1.406-6.001-6.001 6.001-6.001 1.406 1.406-4.594 4.594z'
    },
    CHILD: {
        viewBox: '0 0 24 48',
        path: 'M8.297 28.594l4.594-4.594-4.594-4.594 1.406-1.406 6.001 6.001-6.001 6.001z'
    }
};

exports.default = AddBtn;

/***/ }),

/***/ 258:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"add-icon":"add-btn__add-icon--_Vi_TH","add-before":"add-btn__add-before--QsXyge add-btn__add-icon--_Vi_TH","add-after":"add-btn__add-after--D5YKBt add-btn__add-icon--_Vi_TH","add-parent":"add-btn__add-parent--2UVIQI add-btn__add-icon--_Vi_TH","add-child":"add-btn__add-child--2p8Ylr add-btn__add-icon--_Vi_TH"};

/***/ }),

/***/ 260:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"item":"item__item--2i7JEl","item-input":"item__item-input--1x-Z_m","item-mask":"item__item-mask--xPfKrX","item-level-0":"item__item-level-0--1MZhTt item__item--2i7JEl","item-level-0-selected":"item__item-level-0-selected--3XXwQW item__item-level-0--1MZhTt item__item--2i7JEl","item-level-1":"item__item-level-1--1B4fxY item__item--2i7JEl","item-level-1-selected":"item__item-level-1-selected--2QooqB item__item-level-1--1B4fxY item__item--2i7JEl","item-level-2":"item__item-level-2--132V-7 item__item--2i7JEl","item-level-2-selected":"item__item-level-2-selected--1DJIaG item__item-level-2--132V-7 item__item--2i7JEl","item-level-3":"item__item-level-3--1DEPmP item__item--2i7JEl","item-level-3-selected":"item__item-level-3-selected--JzX4vl item__item-level-3--1DEPmP item__item--2i7JEl","item-no":"item__item-no--3MeAKh"};

/***/ }),

/***/ 261:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"branch":"branch__branch--1Mm4G3","branch-root":"branch__branch-root--8VilXt","parent-item":"branch__parent-item--1pnCAn","child-items":"branch__child-items--_Gj8oh","link":"branch__link--1KFD_M"};

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactCssModules = __webpack_require__(9);

var _reactCssModules2 = _interopRequireDefault(_reactCssModules);

var _reactRedux = __webpack_require__(16);

var _actions = __webpack_require__(17);

var actions = _interopRequireWildcard(_actions);

var _storage = __webpack_require__(40);

var _tools = __webpack_require__(264);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tools = (_dec = (0, _reactCssModules2.default)(_tools2.default, { allowMultiple: true, handleNotFoundStyleName: 'ignore' }), _dec(_class = function (_React$Component) {
    _inherits(Tools, _React$Component);

    function Tools() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Tools);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Tools.__proto__ || Object.getPrototypeOf(Tools)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            showToolGrp: false
        }, _this.toggleShowToolGrp = function () {
            return _this.setState({ showToolGrp: !_this.state.showToolGrp });
        }, _this.handleOptionsOnMap = function (type) {
            if (!_this.props.selectedId) return;
            _this.props.dispatch(actions[type](_this.props.selectedId));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Tools, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var showToolGrp = this.state.showToolGrp;


            return _react2.default.createElement(
                'div',
                { styleName: 'container' },
                _react2.default.createElement(
                    'div',
                    { styleName: showToolGrp ? "expand-btn-expanded" : "expand-btn",
                        onClick: this.toggleShowToolGrp },
                    _react2.default.createElement(
                        'svg',
                        { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                        showToolGrp ? _react2.default.createElement('path', { d: ICON_PATH.fold }) : _react2.default.createElement('path', { d: ICON_PATH.expand })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { styleName: 'tool-grp-container' },
                    _react2.default.createElement(
                        'div',
                        { styleName: 'tool-grp',
                            style: {
                                transform: 'translateX(' + (showToolGrp ? 0 : 264) + 'px)',
                                opacity: showToolGrp ? 1 : 0
                            } },
                        _react2.default.createElement(
                            'div',
                            { styleName: 'btn', onClick: function onClick() {
                                    return _this2.handleOptionsOnMap('copy');
                                } },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: ICON_PATH.copy })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { styleName: 'btn', onClick: function onClick() {
                                    return _this2.handleOptionsOnMap('paste');
                                } },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: ICON_PATH.paste })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { styleName: 'btn', onClick: function onClick() {
                                    return _this2.handleOptionsOnMap('cut');
                                } },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: ICON_PATH.cut })
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { styleName: 'btn', onClick: function onClick() {
                                    return _this2.handleOptionsOnMap('remove');
                                } },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: ICON_PATH.remove })
                            )
                        ),
                        _react2.default.createElement('div', { styleName: 'vertical-line' }),
                        _react2.default.createElement(
                            'div',
                            { styleName: 'btn', onClick: function onClick() {
                                    return _this2.handleOptionsOnMap('numberChild');
                                } },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: ICON_PATH.number })
                            )
                        ),
                        _react2.default.createElement('div', { styleName: 'vertical-line' }),
                        _react2.default.createElement(
                            'div',
                            { styleName: 'btn', onClick: function onClick() {
                                    return (0, _storage.saveMap)(_this2.props.map);
                                } },
                            _react2.default.createElement(
                                'svg',
                                { viewBox: '0 0 36 36', version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
                                _react2.default.createElement('path', { d: ICON_PATH.save })
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Tools;
}(_react2.default.Component)) || _class);


var ICON_PATH = {
    expand: 'M24.727 18.948h-5.779v5.779h-1.896v-5.779h-5.779v-1.896h5.779v-5.779h1.896v5.779h5.779v1.896z',
    fold: 'M25.359 19.037h-14.717v-2.074h14.717v2.074z',
    copy: 'M24.888 13.592c0.456 0 0.827 0.37 0.827 0.827v10.47c0 0.456-0.37 0.827-0.827 0.827h-8.266c-0.456 0-0.827-0.37-0.827-0.827v-2.48h-4.684c-0.456 0-0.827-0.37-0.827-0.827v-5.786c0-0.456 0.267-1.093 0.586-1.412l3.513-3.513c0.319-0.319 0.956-0.586 1.412-0.586h3.582c0.456 0 0.827 0.37 0.827 0.827v2.824c0.336-0.198 0.766-0.344 1.102-0.344h3.582zM20.204 15.426l-2.574 2.574h2.574v-2.574zM14.694 12.119l-2.574 2.574h2.574v-2.574zM16.381 17.69l2.721-2.721v-3.582h-3.306v3.582c0 0.456-0.37 0.827-0.827 0.827h-3.582v5.511h4.408v-2.204c0-0.456 0.267-1.094 0.586-1.412zM24.613 24.613v-9.919h-3.306v3.582c0 0.456-0.37 0.827-0.827 0.827h-3.582v5.511h7.715z',
    paste: 'M16.898 24.613h7.715v-5.511h-3.582c-0.456 0-0.827-0.37-0.827-0.827v-3.582h-3.306v9.919zM19.102 12.214v-0.551c0-0.146-0.129-0.276-0.276-0.276h-6.062c-0.146 0-0.276 0.129-0.276 0.276v0.551c0 0.146 0.129 0.276 0.276 0.276h6.062c0.146 0 0.276-0.129 0.276-0.276zM21.306 18h2.575l-2.575-2.575v2.575zM25.715 19.102v5.786c0 0.456-0.37 0.827-0.827 0.827h-8.266c-0.456 0-0.827-0.37-0.827-0.827v-1.378h-4.684c-0.456 0-0.827-0.37-0.827-0.827v-11.572c0-0.456 0.37-0.827 0.827-0.827h9.368c0.456 0 0.827 0.37 0.827 0.827v2.824c0.112 0.069 0.215 0.146 0.31 0.241l3.513 3.513c0.327 0.327 0.586 0.956 0.586 1.412z',
    cut: 'M23.231 11.26h2.247v0.737l-5.231 5.266-1.51-1.51zM18 18.386c0.211 0 0.386-0.175 0.386-0.386s-0.175-0.386-0.386-0.386-0.386 0.175-0.386 0.386 0.175 0.386 0.386 0.386zM13.507 24.003c0.807 0 1.51-0.667 1.51-1.51s-0.702-1.51-1.51-1.51-1.51 0.667-1.51 1.51 0.702 1.51 1.51 1.51zM13.507 15.016c0.807 0 1.51-0.667 1.51-1.51s-0.702-1.51-1.51-1.51-1.51 0.667-1.51 1.51 0.702 1.51 1.51 1.51zM16.245 14.735l9.232 9.267v0.737h-2.247l-5.231-5.231-1.755 1.755c0.175 0.386 0.246 0.772 0.246 1.229 0 1.65-1.334 2.984-2.984 2.984s-2.984-1.334-2.984-2.984 1.334-2.984 2.984-2.984c0.456 0 0.842 0.070 1.229 0.246l1.755-1.755-1.755-1.755c-0.386 0.175-0.772 0.246-1.229 0.246-1.65 0-2.984-1.334-2.984-2.984s1.334-2.984 2.984-2.984 2.984 1.334 2.984 2.984c0 0.456-0.070 0.842-0.246 1.229z',
    remove: 'M24.727 12.627l-5.373 5.373 5.373 5.373-1.354 1.354-5.373-5.373-5.373 5.373-1.354-1.354 5.373-5.373-5.373-5.373 1.354-1.354 5.373 5.373 5.373-5.373z',
    number: 'M13.682 24.192c0 0.941-0.735 1.471-1.625 1.471-0.539 0-1.086-0.18-1.471-0.565l0.488-0.753c0.231 0.214 0.582 0.385 0.907 0.385 0.299 0 0.616-0.145 0.616-0.488 0-0.479-0.547-0.505-0.898-0.479l-0.222-0.479c0.308-0.393 0.59-0.83 0.958-1.163v-0.009c-0.274 0-0.556 0.017-0.83 0.017v0.453h-0.907v-1.3h2.848v0.753l-0.812 0.984c0.573 0.137 0.949 0.582 0.949 1.172zM13.699 18.83v1.36h-3.096c-0.026-0.154-0.051-0.308-0.051-0.462 0-1.582 1.933-1.822 1.933-2.54 0-0.291-0.18-0.445-0.462-0.445-0.299 0-0.547 0.257-0.693 0.496l-0.727-0.505c0.282-0.59 0.864-0.924 1.514-0.924 0.795 0 1.48 0.47 1.48 1.317 0 1.266-1.856 1.548-1.881 2.215h1.086v-0.513h0.898zM25.749 21.558v1.642c0 0.145-0.128 0.274-0.274 0.274h-10.399c-0.154 0-0.274-0.128-0.274-0.274v-1.642c0-0.154 0.12-0.274 0.274-0.274h10.399c0.145 0 0.274 0.12 0.274 0.274zM13.708 13.869v0.847h-2.865v-0.847h0.915c0-0.693 0.009-1.385 0.009-2.078v-0.103h-0.017c-0.094 0.188-0.265 0.316-0.428 0.462l-0.607-0.65 1.163-1.086h0.907v3.455h0.924zM25.749 17.179v1.642c0 0.145-0.128 0.274-0.274 0.274h-10.399c-0.154 0-0.274-0.128-0.274-0.274v-1.642c0-0.154 0.12-0.274 0.274-0.274h10.399c0.145 0 0.274 0.12 0.274 0.274zM25.749 12.8v1.642c0 0.145-0.128 0.274-0.274 0.274h-10.399c-0.154 0-0.274-0.128-0.274-0.274v-1.642c0-0.145 0.12-0.274 0.274-0.274h10.399c0.145 0 0.274 0.128 0.274 0.274z',
    save: 'M21.769 18.74h-2.255v-2.994h-3.030v2.994h-2.254l3.769 3.769zM23.531 16.52c1.938 0.141 3.487 1.761 3.487 3.734 0 2.078-1.691 3.769-3.769 3.769h-9.758c-2.501 0-4.509-2.008-4.509-4.509 0-2.325 1.761-4.227 4.016-4.474 0.951-1.797 2.818-3.065 5.002-3.065 2.748 0 5.002 1.938 5.531 4.544'
};

exports.default = (0, _reactRedux.connect)(function (state) {
    return state;
})(Tools);

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(41);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toast = function (_React$Component) {
    _inherits(Toast, _React$Component);

    function Toast() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Toast);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Toast.__proto__ || Object.getPrototypeOf(Toast)).call.apply(_ref, [this].concat(args))), _this), _this.handleUnmount = function (e) {
            if (e.target.style.opacity != 0) return;

            _reactDom2.default.unmountComponentAtNode(e.target.parentNode);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Toast, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var toastNode = _reactDom2.default.findDOMNode(this);
            toastNode.style.opacity = 1;
            setTimeout(function () {
                toastNode.style.opacity = 0;
            }, 3000);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeChild(document.getElementById('toast-root'));
        }
    }, {
        key: 'render',
        value: function render() {
            var style = {
                opacity: 0,
                position: 'fixed',
                left: '50%',
                bottom: '36px',
                transform: 'translateX(-50%)',
                minWidth: '300px',
                height: '36px',
                lineHeight: '36px',
                backgroundColor: 'rgba(144, 139, 125, .5)',
                borderRadius: '18px',
                color: '#fff',
                fontSize: '16px',
                textAlign: 'center',
                boxShadow: '0 2px 8px 1px rgba(144, 139, 125, .2)',
                transition: 'all 120ms ease-out'
            };
            return _react2.default.createElement(
                'div',
                { style: style, onTransitionEnd: this.handleUnmount },
                this.props.text
            );
        }
    }]);

    return Toast;
}(_react2.default.Component);

var showToast = function showToast(text) {
    var toastRootNode = document.createElement('div');
    toastRootNode.id = 'toast-root';
    document.body.appendChild(toastRootNode);

    _reactDom2.default.render(_react2.default.createElement(Toast, { text: text }), toastRootNode);
};

exports.default = showToast;

/***/ }),

/***/ 264:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"tools__container--1nBsRN","btn":"tools__btn--bCQSyH","expand-btn":"tools__expand-btn--2fwcGy tools__btn--bCQSyH","expand-btn-expanded":"tools__expand-btn-expanded--Lc8a00 tools__expand-btn--2fwcGy tools__btn--bCQSyH","tool-grp-container":"tools__tool-grp-container--2POP2x","tool-grp":"tools__tool-grp--32xDgn","vertical-line":"tools__vertical-line--3TZvCL"};

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actions = __webpack_require__(17);

var actions = _interopRequireWildcard(_actions);

var _storage = __webpack_require__(40);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var handler = function handler(store) {
    return function (e) {
        if (e.target !== document.body) return;

        var _store$getState = store.getState(),
            selectedId = _store$getState.selectedId,
            map = _store$getState.map,
            hasSelectedItem = selectedId !== '',
            dispatch = store.dispatch;

        if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'c') {
            dispatch(actions.copy(selectedId));
        } else if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'v') {
            dispatch(actions.paste(selectedId));
        } else if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'x') {
            dispatch(actions.cut(selectedId));
        } else if (hasSelectedItem && e.ctrlKey && e.key.toLowerCase() === 'l') {
            e.preventDefault();
            dispatch(actions.numberChild(selectedId));
        } else if (hasSelectedItem && e.key.toLowerCase() === 'delete') {
            dispatch(actions.remove(selectedId));
        } else if (e.ctrlKey && e.key.toLowerCase() === 's') {
            e.preventDefault();
            (0, _storage.saveMap)(map);
        }
    };
};

exports.default = handler;

/***/ }),

/***/ 266:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.retrieveMap = exports.saveMap = undefined;

var _toast = __webpack_require__(263);

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = '__MIND_MAP';

var saveMap = function saveMap(map) {
    try {
        var stringifiedMap = JSON.stringify(map);
        localStorage.setItem(KEY, stringifiedMap);
        (0, _toast2.default)('保存成功，下次打开可继续编辑 :)');
    } catch (e) {
        (0, _toast2.default)('保存失败');
    }
};

var retrieveMap = function retrieveMap() {
    try {
        var stringifiedMap = localStorage.getItem(KEY);
        if (stringifiedMap === null) {
            return undefined;
        } else {
            return JSON.parse(stringifiedMap);
        }
    } catch (e) {
        return undefined;
    }
};

exports.saveMap = saveMap;
exports.retrieveMap = retrieveMap;

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"map":"map__map--3vxAyr"};

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(41);

var _redux = __webpack_require__(48);

var _reactRedux = __webpack_require__(16);

var _reducers = __webpack_require__(122);

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = __webpack_require__(17);

var _app = __webpack_require__(129);

var _app2 = _interopRequireDefault(_app);

var _storage = __webpack_require__(40);

var _keyboardEventHandler = __webpack_require__(265);

var _keyboardEventHandler2 = _interopRequireDefault(_keyboardEventHandler);

__webpack_require__(266);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var retrievedMap = (0, _storage.retrieveMap)();

var store = (0, _redux.createStore)(_reducers2.default, { map: retrievedMap });

document.body.onkeydown = (0, _keyboardEventHandler2.default)(store);

document.body.onclick = function (e) {
    if (e.target === document.body || typeof e.target.className === 'string' && e.target.className.indexOf('branch') === 0) {
        store.dispatch((0, _actions.selectItem)());
    }
};

var scrollToView = function scrollToView() {
    var windowWidth = window.innerWidth,
        windowHeight = window.innerHeight,
        scrollX = 333 - windowWidth / 4,
        scrollY = 3333 - windowHeight / 3;
    window.scroll(scrollX, scrollY);
};

window.onload = function () {
    scrollToView();
    (0, _reactDom.render)(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(_app2.default, null)
    ), document.getElementById('root'));
};

/***/ })

},[84]);