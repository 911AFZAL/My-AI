	async function sendMessage() {
			const input = document.getElementById('userInput').value;
			const responseDiv = document.getElementById('response');
			if (!input) {
				responseDiv.innerHTML = '⚠️ Please enter a message.';
				return;
			}
			responseDiv.innerHTML = '🧠 Thinking...';

			try {
				const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
					method: 'POST',
					headers: {
						Authorization: 'Apna Api' ,
						'HTTP-Referer': 'https://www.sitename.com',
						'X-Title': 'SiteName',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					 model:"Name",


						messages: [{ role: 'user', content: input }],
					}),
				});

				const data = await response.json();
				const markdownText = data.choices?.[0]?.message?.content || '⚠️ No response received.';
				const htmlText = marked.parse(markdownText);
				
				typeEffect(responseDiv, htmlText, 0);
			} catch (error) {
				responseDiv.innerHTML = '❌ Error: ' + error.message;
			}
		}

		// Typing effect
		function typeEffect(element, html, index) {
			const tempDiv = document.createElement('div');
			tempDiv.innerHTML = html;
			const plainText = tempDiv.textContent || tempDiv.innerText || "";

			if (index < plainText.length) {
				element.textContent = plainText.substring(0, index + 1);
				setTimeout(() => typeEffect(element, html, index + 1), 15);
			} else {
				element.innerHTML = html;
			}
		}
	