
export function beginEditHandler(dispatch, name, id, e){
  if (e) e.stopPropagation();
  dispatch({
    type: name + '/beginEdit',
    payload: {id: id}
  });
}

export function deleteHandler(dispatch, name, id) {
  dispatch({
    type: name + '/remove',
    payload: {id}
  })
}
