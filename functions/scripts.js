/**
 * handles the ajax response
 * @param  {object} data
 * @param  {object} status
 * @param  {object} headers
 * @param  {object} config
 * @return {bool}
 */
function handle_ajax_response(data, status, headers, config) {
	if (typeof data != "undefined" && data !== null) {
		if (typeof data.status != "undefined") {
			if (data.status == "failure") {
				handle_failure(data, status, headers, config);
				return false;
			}
		} else {
			handle_error(data, status, headers, config);
			return false;
		}
	} else {
		return false;
	}
	return true;
}
/**
 *  handles failures responses from the server
 * @param  {object} data
 * @param  {object} status
 * @param  {object} headers
 * @param  {object} config
 * @return {bool}
 */
function handle_failure(data, status, headers, config) {
	//single_button_popup_box("Failure", data.user_message, "Close");
	return true;
}
/**
 * handles error by display an error popup
 * @param  {object} data
 * @param  {object} status
 * @param  {object} headers
 * @param  {object} config
 * @return {bool}
 */
function handle_error(data, status, headers, config) {
	//single_button_popup_box("Error", "An error occured", "Close");
	return true;
}


function is_in_array(value, array) {
    return array.indexOf(value) > -1;
}

/**
 * get the row id of the attribute with the specific value
 * @param  {array} array The array to search in
 * @param  {string} attr The attribute to search for
 * @param  {string} value The value of the attr to search for
 * @return {int} i The row index
 */
function get_row_id(array, attr, value) {
    if(array){
        for (var i = 0; i < array.length; i++) {
            if (array[i] && array[i].hasOwnProperty(attr)) {
                if (array[i][attr] == value) {
                    return i;
                }
            }
        }
    }
    return -1;
}
