window.dom = {
    style (node, name, value) {
        if (arguments.length === 3) node.style[name] = value;
        else if (arguments === 2) {
            if (typeof name === "string") return node.style[name];
            else if (name instanceof Object) {
                const object = name;
                for(let key in object)node.style[key] = object[key];
            }
        }
    },
    each (nodeList, fn) {
        for(let i = 0; i < nodeList.length; i++)fn.call(null, nodeList[i]);
    },
    find (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    }
};

//# sourceMappingURL=index.e70e4287.js.map