import React from 'react';

export const withToDelete = Component => {

    class WithToDelete extends React.Component {

        state = {
            toDelete: []
        }
        
        marketToDelete = (id) => () => {
            if(this.state.toDelete.length===0) return;
            this.activeToDelete(id)();
        };
    
        activeToDelete = (id) => () => {
            if(this.state.toDelete.includes(id)) {
                const toDelete = this.state.toDelete.filter(_id=>_id!=id);
                this.setState({ toDelete });
            } else {
                const toDelete = [...this.state.toDelete, id];
                this.setState({ toDelete });
            };
        };

        resetToDelete = () => this.setState({ toDelete: [] });

        render() {
            return(
                <Component 
                    {...this.props}
                    toDelete={this.state.toDelete}
                    marketToDelete={this.marketToDelete}
                    activeToDelete={this.activeToDelete}
                    resetToDelete={this.resetToDelete}
                />
            );
        }
    };

    return WithToDelete;
}