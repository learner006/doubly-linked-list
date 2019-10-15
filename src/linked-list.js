const Node = require('./node');

class LinkedList {
    constructor() {
    	this._head = null;
    	this._tail = null;
    	this.length = 0;
    }

    head() {
    	return (this._head !== null ? this._head.data : null);
    }

    tail() {
    	return (this._tail !== null ? this._tail.data : null);
    }

    length() {
    	let out_length = 0;

    	let it = this._head;

    	if (it !== null) {
    		while(1) {
                ++out_length;
                if (it.next === null)
                    break;
                else
                    it = it.next;
        	}
    	}

		return out_length;
    }

    append(p_data) {
    	let newItem = new Node(p_data);

    	if (this._tail === null)
    	{
    		this._head = newItem;
    		this._tail = newItem;
    	}
    	else
    	{
    		let oldTail = this._tail;
    		oldTail.next = newItem;
    		newItem.prev = oldTail;

    		this._tail = newItem;
    	}

    	++this.length;

    	return this;
    }

    at(p_Index, p_isReturnRef = false) {
    	let out_Item = null;
    	let it = this._head;

    	if (it !== null && p_Index >=0)
    	{
    		let curr_idx = 0;
    		let isFound = false;

            while (1)
            {
                isFound = (curr_idx == p_Index);
    
                if (it.next === null || isFound)
                    break;
                else
                {
                    it = it.next;
                    ++curr_idx;
                }
            }

        	if (isFound)
            	out_Item = it;
    	}

    	return (p_isReturnRef ? out_Item : out_Item.data);
    }

    insertAt(p_Index, p_Data) {
    	let out_Item = null;
    	let fisReturnRef = true;
    	let it = this.at(p_Index,fisReturnRef);


    	if (it !== null)
    	{
    		let newItem = new Node(p_Data);

            // Let's insert a new item in the chain of memory blocks
            // We 'replace' an item with the given index
    
            let fNeedToUpdateHead = (it.prev === null);

            let leftSibling = it.prev;
            let rightSibling = it;

            newItem.next = rightSibling;
            rightSibling.prev = newItem;

            newItem.prev = leftSibling;
            if (leftSibling !== null)
            	leftSibling.next = newItem;

            out_Item = newItem;

        	if (fNeedToUpdateHead)
            	this._head = out_Item;
		}

		++this.length;

		return out_Item !== null ? this : null;
    }

    deleteAt(p_Index) {
    	let out_isSuccess = false;

    	let fisReturnRef = true;
    	let it = this.at(p_Index,fisReturnRef);


    	if (it !== null)
    	{
    		let fNeedToUpdateHead = (it.prev === null);
    		let fNeedToUpdateTail = (it.next === null);

            if (fNeedToUpdateHead)
                this._head = this._head.next;
            if (fNeedToUpdateTail)
                this._tail = this._tail.prev;

            let leftSibling = it.prev;
            let rightSibling = it.next;

			if (leftSibling)
				leftSibling.next = rightSibling;
			if (rightSibling)
				rightSibling.prev = leftSibling;

			// Let's delete an item! :-)
			it = null;

			--this.length;

        	out_isSuccess = true;
    	}

		return out_isSuccess ? this : null;
    }

    reverse() {
    	let it = this._head;

    	if (it !== null)
    	{
    		let temp_next = null;

            while(1)
            {
                temp_next = it.next;
    
			    it.next = it.prev;
			    it.prev = temp_next;
    
                // It was the last item in list
                if(temp_next === null)
                    break;
                else
                    it = temp_next;
            }
    
            // Let's swap a head and a tail
            if (this._head !== this._tail)
	        {
	        	let temp = this._tail;
			    this._tail = this._head;
    		    this._head = temp;
            }
    	}

    	return this;
    }

    clear() {
    	let liCurrent = this._head;
    	let liRightSibling = null;

    	if (liCurrent)
    		liRightSibling = liCurrent.next;

    	if (liCurrent)
    	{
            while(1)
            {
                // Move the head pointer forward
                this._head = liRightSibling;
    
                // Update state
			    if (liRightSibling)
				    liRightSibling.prev = null;
    
                // Delete an item
                liCurrent = null;
    
			    if (liRightSibling === null)
			    {
                    break;
                }
                else 
                {
                    liCurrent = liRightSibling;
                    liRightSibling = liRightSibling.next;
                }
            }

            this._head = null;
            this._tail = null;

       		this.length = 0;
    	}

    	return this;
    }

    indexOf(p_Data) {
    	let out_Index = -1;

    	let it = this._head;

    	if (it !== null)
    	{
        	let curr_idx = 0;
            let isFound = false;
            while(1)
            {
                isFound = (it.data == p_Data);
                
                if ((it.next === null) || isFound)
                    break;
                else {
                    it = it.next;
                    ++curr_idx;
                }
            }

            if (isFound)
                out_Index = curr_idx;
    	}

	    return out_Index;
    }

    isEmpty()
    {
    	return this._head === null;
    }

    print(p_isForwardOrReverse = true) {
    	let out_Result = '';

    	if (this._head === null)
    		out_Result = "[List is empty]";
    	else {
    		let it = p_isForwardOrReverse ? this._head : this._tail;

    		while(1)
    		{
    			let isLastItemForOutput = p_isForwardOrReverse ? (it.next === null) : (it._tail === null);
    			let comma = isLastItemForOutput ? "" : ", ";

    			out_Result += it.data + comma;

                // Where should we go? ;-)
                if (p_isForwardOrReverse)
                {
                    if (isLastItemForOutput)
                        break;
                    else
                        it = it.next;
                }
                else
                {
                    if (isLastItemForOutput)
                        break;
                    else
                        it = it.prev;
                }

    		}
    	}

    	return out_Result;
    }

}

module.exports = LinkedList;