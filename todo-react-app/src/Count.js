import React,{useState} from "react";

function Example(){
    const[count, setCount] = useState(0);
    // let countArray = useState(0);
    // let count = countArray[0];
    // let setCount = countArray[1];

    return(
        <div>
            <h1> clicked {count} times </h1>
            {/* 버튼을 누르면 count값을 변화시키고 Example 컴포넌트에 넘기면 재렌더링을한다. */}
            <button onClick={() => setCount(count+1)}>Click me</button>           
        </div>
    )
}
export default Example;