function reconcile(oldNode, newNode) {
    if (!oldNode) { 
        return createNode(newNode);
    } else if (!newNode) {
        return removeNode(oldNode);
    } else if (changed(oldNode, newNode)) {
        return replaceNode(oldNode, newNode);
    } else if (newNode.type) {
        updateAttributes(oldNode, newNode);
        reconcileChildren(oldNode, newNode);
    }
}

function changed(node1, node2) {
    return typeof node1 !== typeof node2 ||
           (typeof node1 === 'string' || typeof node1 === 'number') && node1 !== node2 ||
           node1.type !== node2.type;
}

function updateAttributes(oldNode, newNode) {
    const oldProps = oldNode.props || {};
    const newProps = newNode.props || {};

    for (let prop in newProps) {
        if (newProps[prop] !== oldProps[prop]) {
            setAttribute(oldNode.dom, prop, newProps[prop]);
        }
    }

    for (let prop in oldProps) {
        if (!(prop in newProps)) {
            removeAttribute(oldNode.dom, prop);
        }
    }
}

function reconcileChildren(oldNode, newNode) {
    const oldChildren = oldNode.children || [];
    const newChildren = newNode.children || [];
    const maxLen = Math.max(oldChildren.length, newChildren.length);

    for (let i = 0; i < maxLen; i++) {
        reconcile(oldChildren[i], newChildren[i]);
    }
}

function createNode(vNode) {
    const node = document.createElement(vNode.type);
    vNode.dom = node;
    updateAttributes({}, vNode);
    vNode.children.forEach(child => node.appendChild(createNode(child)));
    return node;
}

function removeNode(vNode) {
    vNode.dom.remove();
}

function replaceNode(oldNode, newNode) {
    const newDomNode = createNode(newNode);
    oldNode.dom.replaceWith(newDomNode);
    newNode.dom = newDomNode;
}

function setAttribute(dom, name, value) {
    dom.setAttribute(name, value);
}

function removeAttribute(dom, name) {
    dom.removeAttribute(name);
}

const oldVNode = {
    type: 'div',
    props: { className: 'container' },
    children: [
        { type: 'span', props: { className: 'text' }, children: ['Hello'] },
        { type: 'span', props: { className: 'text' }, children: ['World'] }
    ]
};

const newVNode = {
    type: 'div',
    props: { className: 'container-fluid' },
    children: [
        { type: 'span', props: { className: 'text' }, children: ['Hello'] },
        { type: 'span', props: { className: 'text' }, children: ['React'] }
    ]
};

reconcile(oldVNode, newVNode);
