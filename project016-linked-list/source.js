function createNode(data, next=null){
    return {data, next}
}

function createLinkedList(array){
    let head = createNode(array[0]);
    let backNode = head;
    array.slice(1).forEach(number => {
        let node = createNode(number);
        backNode.next = node;
        backNode = node;
    });

    let append = function(value) {
        let pointer = head;
        while(pointer.next){
            pointer = pointer.next;
        }
        pointer.next = createNode(value);
    }

    let size = function() {
        let result = 0;
        let pointer = head;
        while(pointer){
            result++;
            pointer = pointer.next;
        }
        return result;
    }

    let prepend = function(value) {
        let newHead = createNode(value);
        newHead.next = head;
        head = newHead;
    }

    let getHead = function(){return head.data}

    let toString = function() {
        let result = "";
        let pointer = head;
        while(pointer){
            result += `(${pointer.data}) --> `
            pointer = pointer.next;
        }
        result += 'null'
        return result;
    }

    let tail = function() {
        let pointer = head;
        while(pointer.next){
            pointer = pointer.next;
        }
        return pointer.data;
    }  

    let at = function(index) {
        let pointer = head;
        for(let i = 0; i < index; i++){
            pointer = pointer.next;
        }
        return pointer.data;
    }

    let pop = function() {
        let pointer = head;
        while(pointer.next.next){
            pointer = pointer.next;
        }
        pointer.next = null;
    }

    let contains = function(value) {
        let pointer = head;
        while(pointer){
            if (pointer.data == value) return true;
            pointer = pointer.next;
        }
        return false;
    }

    let find = function(value) {
        let pointer = head;
        let index = 0;
        while(pointer){
            if (pointer.data == value) return index;
            pointer = pointer.next;
            index++;
        }
        return false;
    }

    let insertAt = function(value, place) {
        let pointer = head;
        if (place == 0) {
            let node = createNode(value);
            node.next = head;
            head = node;
            return
        }
        let index = 1;
        while(pointer){
            if (index == place) {
                let node = createNode(value);
                node.next = pointer.next;
                pointer.next = node;
                return;
            }
            pointer = pointer.next;
            index++;
        }

    }

    let removeAt = function(place) {
        let pointer = head;
        if (place == 0) {
            head = head.next;
            return;
        }
        let index = 1;
        while(pointer){
            if (index == place) {
                pointer.next = pointer.next.next;
                return;
            }
            pointer = pointer.next;
            index++;
        }
    }

    return {toString, append, prepend, size, getHead, tail, at, pop, contains, find, insertAt, removeAt}
}

const testArray = [3, 5, 6, 2, 1];
let ll = createLinkedList(testArray);
ll.append(200);
ll.prepend(0);
console.log(ll.toString());
console.log(ll.size());
console.log(ll.getHead());
console.log(ll.tail());
console.log(ll.at(3));
ll.pop();
console.log(ll.toString());
console.log(ll.contains(5));
console.log(ll.contains(121));
console.log(ll.find(5));
console.log(ll.find(121));
ll.insertAt(2000, 0);
console.log(ll.toString());
ll.removeAt(1);
console.log(ll.toString());

