import React, { Component } from "react";
import "./TrackCard.css";

export default class TrackCard extends Component {
    render() {
        const item = this.props.track;
        return (
            <div className="Track-Container" id={item.uri}>
                <img
                    className="Track-AlbumCover border"
                    src={item.album_cover_64}
                    alt=""
                />
                <div className="Track-Info">
                    <span title={`${item.artist} - ${item.name}`} className="Track-Name highlighted">
                        {item.artist} - {item.name}{" "}
                    </span>
                    <span className="Track-AlbumName highlighted">
                        {item.album_name}
                    </span>
                </div>
                <div className="Track-Choice">
                    <input
                        className="Track-Checkbox"
                        type="checkbox"
                        id={"chkbox-" + item.uri}
                        value={item.uri}
                        onChange={this.props.onChange}
                        checked={this.props.checked}
                    />
                    <label htmlFor={"chkbox-" + item.uri}></label>
                </div>
            </div>
        );
    }
}
