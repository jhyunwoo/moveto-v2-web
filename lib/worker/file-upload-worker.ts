const handleMessage = (event: MessageEvent<ClientToFileUploadWorker>) => {
  console.log(event.data)
}

typeof self === 'object' && self.addEventListener('message', handleMessage)
