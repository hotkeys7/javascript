let count = 0;

const value = document.querySelector("#value");

const btns = document.querySelectorAll(".btn");

btns.forEach(press);



function press(btn) {
	btn.addEventListener("click", function(e) {
		const st = e.currentTarget.classList;
		if(st.contains("decrease")){
			count--;
		}
		else if(st.contains("increase")){
			count++;
		}
		else{
			count = 0;
		}
		if(count > 0){
			value.style.color = "green";
		}
		if(count < 0){
			value.style.color = "red"
		}
		if(count===0){
			value.style.color = "#222"
		}
		value.textContent = count;

	})

}