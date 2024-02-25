"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableSort = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const _components_1 = require("../_components");
const types_1 = require("./src/components/Table/types");
const utils_1 = require("./src/components/Table/utils");
require("./styles.css");
exports.TableSort = (_a) => {
    var _b;
    var { className = "", columns, iconUp, iconDown, nameColumnIndex, rows, sortBy = types_1.NumberSortingColumns.ZERO } = _a, rest = __rest(_a, ["className", "columns", "iconUp", "iconDown", "nameColumnIndex", "rows", "sortBy"]);
    const [currentKey, setCurrentKey] = react_1.useState();
    const [currentKeys, setCurrentKeys] = react_1.useState({});
    const [data, setData] = react_1.useState(rows);
    const [orderAscending, setOrderAscending] = react_1.useState([]);
    const [orderDescending, setOrderDescending] = react_1.useState([]);
    const sortByOneColumn = (key) => {
        setCurrentKey(key);
        switch (key.order) {
            case types_1.SortType.ASCENDING:
                setData([...data].sort(utils_1.byKey(key)));
                break;
            case types_1.SortType.DESCENDING:
                setData([...data].reverse());
                break;
            default:
                setData(rows);
        }
    };
    const sortByTwoColumns = (key, updateKeysSort) => {
        setCurrentKeys(updateKeysSort);
        if (Object.keys(updateKeysSort).length === 0) {
            setData(rows);
        }
        const mainKey = updateKeysSort === null || updateKeysSort === void 0 ? void 0 : updateKeysSort.mainKey;
        const secondKey = updateKeysSort === null || updateKeysSort === void 0 ? void 0 : updateKeysSort.secondKey;
        if (key.name === (mainKey === null || mainKey === void 0 ? void 0 : mainKey.name)) {
            {
                setData([...data].sort(utils_1.byKeys(updateKeysSort)));
            }
        }
        if (key.name === (secondKey === null || secondKey === void 0 ? void 0 : secondKey.name)) {
            if ((secondKey === null || secondKey === void 0 ? void 0 : secondKey.order) !== types_1.SortType.NONE &&
                (mainKey === null || mainKey === void 0 ? void 0 : mainKey.order) !== types_1.SortType.NONE) {
                setData([...data].sort(utils_1.byKeys(updateKeysSort)));
                if (!orderAscending.length && (mainKey === null || mainKey === void 0 ? void 0 : mainKey.order) === types_1.SortType.ASCENDING) {
                    setOrderAscending(utils_1.order([...data]));
                }
                if (!orderDescending.length && (mainKey === null || mainKey === void 0 ? void 0 : mainKey.order) === types_1.SortType.DESCENDING) {
                    setOrderDescending(utils_1.order([...data]));
                }
            }
            if ((secondKey === null || secondKey === void 0 ? void 0 : secondKey.order) === types_1.SortType.NONE) {
                if ((mainKey === null || mainKey === void 0 ? void 0 : mainKey.order) === types_1.SortType.ASCENDING) {
                    setData(utils_1.restoreOrder(orderAscending, [...data]));
                    setOrderAscending([]);
                }
                else {
                    setData(utils_1.restoreOrder(orderDescending, [...data]));
                    setOrderDescending([]);
                }
            }
        }
    };
    const setKeySort = (key) => {
        if (sortBy === types_1.NumberSortingColumns.ONE) {
            return sortByOneColumn(utils_1.setKey(key, currentKey));
        }
        if (sortBy === types_1.NumberSortingColumns.TWO) {
            const updateKeys = utils_1.updateParametersKeys(key, currentKeys);
            return sortByTwoColumns(key, updateKeys);
        }
    };
    const dataColumns = react_1.useCallback((columns, nameColumnIndex) => {
        if (nameColumnIndex !== undefined) {
            return utils_1.addIndexInColumns(columns, nameColumnIndex);
        }
        else {
            return columns;
        }
    }, [columns, nameColumnIndex]);
    const dataRows = react_1.useCallback((rows, nameColumnIndex) => {
        if (nameColumnIndex !== undefined) {
            return utils_1.addIndexInRows(rows);
        }
        else {
            return rows;
        }
    }, [rows, nameColumnIndex]);
    const arrKeysNameColumns = react_1.useCallback((columns, nameColumnIndex) => {
        return utils_1.getKeysNamesColumns(columns, nameColumnIndex);
    }, [columns, nameColumnIndex]);
    return (<table className={classnames_1.default("itpc-table-sort", className)} {...rest}>
      {(columns === null || columns === void 0 ? void 0 : columns.length) && (<_components_1.TableHeader columns={dataColumns(columns, nameColumnIndex)} currentKey={currentKey} currentKeys={currentKeys} iconUp={iconUp} iconDown={iconDown} setKeySort={setKeySort} sortBy={sortBy}/>)}

      {data && (<_components_1.TableBody arrKeysNameColumns={columns && arrKeysNameColumns(columns, nameColumnIndex)} nameMainColumnSort={(_b = currentKeys === null || currentKeys === void 0 ? void 0 : currentKeys.mainKey) === null || _b === void 0 ? void 0 : _b.name} rows={dataRows(data, nameColumnIndex)} sortBy={sortBy}/>)}
    </table>);
};
