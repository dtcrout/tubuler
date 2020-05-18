function handleResponse(response) {
    const parsedResponse = JSON.parse(response);

    if (parsedResponse.status == '1') {
        return '🎉 Success!';
    } else if (parsedResponse.status == '-1') {
        return '❌ Failed to download...';
    }
}

export default handleResponse;