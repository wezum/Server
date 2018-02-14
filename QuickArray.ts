// an array that preserve the index of elements so it can be used as an ID
export class QuickArray<T>{
    array: Array<T> = [];
    // points to the empty elements in the array
    private pointer: Array<number> = [];

    // length of the array excluding the null items
    length: number = 0;
    
    private get actualLength(): number{
        return this.array.length;
    }

    forEach(block){
        for(let i = 0; i < this.array.length; i++) {
            if(this.array[i]){
                block(this.array[i], i);
            }
        }
    }

    // Adds the element to any free spot in the array and returns the index (should be saved)
    add(element: T): number{
        this.length++;
        
        const pointer = this.getPointer();
        if(pointer){
            this.array[pointer] = element;
            return pointer;
        }else{
            this.array.push(element);
            return this.array.length - 1;
        }
    }

    // frees the element spot so it can be used in future and without shifting the array
    remove(id: number){
        if(id >= this.array.length) {
            console.log("can't remove element index out of range");
            return;
        }

        this.length--;
        this.array[id] = null;

        this.pointer.push(id);
        this.trim();
    }

    private trim(){
        while(this.array.length > 0 && !this.array[this.array.length - 1]){
            this.array.splice(this.array.length - 1);
        }
    }

    private getPointer(): number | null{
        while(this.pointer.length > 0 && this.pointer[0] >= this.array.length){
            this.pointer.splice(0, 1);
        }

        if(this.pointer.length > 0){
            return this.pointer.pop();
        }
        
        return null;
    }
}