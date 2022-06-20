window.dom = {
    //创建标签
    create (string) {
        const container = document.createElement("template");
        container.innerHTML = string.trim();
        return container.content.firstChild;
    },
    //在后面加标签
    after (node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    //在前面加标签
    before (node, node2) {
        node.parentNode.insertBefore(node2, node);
    },
    //在节点里加儿子
    append (parent, node) {
        parent.appendChild(node);
    },
    //在节点外加爸爸
    wrap (node, parent) {
        dom.before(node, parent);
        dom.after(parent, node);
    },
    //删除一个节点
    remove (node) {
        node.parentNode.removeChild(node);
        return node;
    },
    //删除一个节点中的所有儿子
    empty (node) {
        const { childNodes  } = node;
        //相当于 const childNodes = node.childNodes;
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    //用于读写属性
    attr (node, name, value) {
        if (arguments.length === 3) node.setAttribute(name, value);
        else if (arguments.length === 2) return node.getAttribute(name);
    },
    //在节点内写文本
    text (node, string) {
        if (arguments.length === 2) {
            if ("innerText" in node) node.innerText = string; //ie
            else node.textContent = string; //其他
        } else if (arguments.length === 1) {
            if ("innerText" in node) return node.innerText; //ie
            else return node.textContent; //其他
        }
    },
    //读写html文本，包括html标签
    html (node, string) {
        if (arguments.length === 2) node.innerHTML = string;
        else if (arguments.length) return node.innerHTML;
    },
    //写style内容
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
    //增删class
    class: {
        add (node, className) {
            node.classList.add(className);
        },
        remove (node, className) {
            node.classList.remove(className);
        },
        has (node, className) {
            return node.classList.contains(className);
        }
    },
    //添加事件
    on (node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    off (node, eventName, fn) {
        node.removeEventListener(eventName, fn);
    },
    //获取节点
    find (selector, scope) {
        return (scope || document).querySelectorAll(selector);
    },
    //获取父节点
    parent (node) {
        return node.parentNode;
    },
    //获取子节点
    children (node) {
        return node.children;
    },
    //获取兄弟节点
    siblings (node) {
        return Array.from(node.parentNode.children).filter((n)=>n !== node);
    },
    //获取弟弟节点
    next (node) {
        let x = node.nextSibling;
        while(x && x.nodeType === 3)x = x.nextSibling;
        return x;
    },
    //获取哥哥节点
    previous (node) {
        let x = node.previousSibling;
        while(x && x.nodeType === 3)x = x.previousSibling;
        return x;
    },
    //遍历所有节点
    each (nodeList, fn) {
        for(let i = 0; i < nodeList.length; i++)fn.call(null, nodeList[i]);
    },
    //用于获取一个节点排行多少
    index (node) {
        const list = dom.children(node.parentNode);
        let i;
        for(i = 0; i < list.length; i++){
            if (list[i] === node) break;
        }
        return i;
    }
};

//# sourceMappingURL=index.755bdb92.js.map
