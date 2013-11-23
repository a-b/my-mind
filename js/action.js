MM.Action = function() {}
MM.Action.prototype.perform = function() {}
MM.Action.prototype.undo = function() {}

MM.Action.SetText = function(item, text) {
	this._item = item;
	this._text = text;
	this._oldText = item.getText();
}
MM.Action.SetText.prototype = Object.create(MM.Action.prototype);
MM.Action.SetText.prototype.perform = function() {
	this._item.setText(this._text);
}
MM.Action.SetText.prototype.undo = function() {
	this._item.setText(this._oldText);
}

MM.Action.InsertItem = function(parent, index) {
	this._parent = parent;
	this._index = index;
	this._item = null;
}
MM.Action.InsertItem.prototype = Object.create(MM.Action.prototype);
MM.Action.InsertItem.prototype.perform = function() {
	this._item = this._parent.insertChild(this._index);
}
MM.Action.InsertItem.prototype.undo = function() {
	this._parent.removeChild(this._item);
	this._item = null;
}

MM.Action.RemoveItem = function(item) {
	this._item = item;
	this._parent = null;
	this._index = -1;
}
MM.Action.RemoveItem.prototype = Object.create(MM.Action.prototype);
MM.Action.RemoveItem.prototype.perform = function() {
	this._parent = this._item.getParent();
	var children = this._parent.getChildren();
	this._index = children.indexOf(this._item);
	this._parent.removeChild(this._item);
}
MM.Action.RemoveItem.prototype.undo = function() {
	this._parent.insertChild(this._item, this._index);
	this._parent = null;
	this._index = -1;
}
