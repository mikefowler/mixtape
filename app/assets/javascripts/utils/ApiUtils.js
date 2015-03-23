function normalizeApiResponse(entity, response = {}) {
  let items = {};
  let result = [];

  if (response.items) {
    response.items.forEach((i) => {
      result.push(i.id);
      items[i.id] = i;
    });
  } else if (response.id) {
    result.push(response.id);
    items[response.id] = response;
  }

  return {
    result: result,
    entities: {
      [entity]: items
    },
    next: response.next
  };
}

export function normalizePlaylistResponse(response) {
  return normalizeApiResponse('playlists', response);
}
