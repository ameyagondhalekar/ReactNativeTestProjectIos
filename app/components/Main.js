import React from 'react';

import Note from './Note';

import ReactNative from 'react-native';

import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// import { Component } from '../../../Library/Caches/typescript/2.6/node_modules/@types/react';
// import {KeyboardSpacer} from 'react-native-keyboard-spacer';

export default class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noteArray: [],
            noteText: '',
        };

    }

    render() {

        let notes = this.state.noteArray.map((val, key) => {

            return <Note key={key} keyval={key} val={val}
                deleteMethod={() => this.deleteNote(key)} />
        });

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        - Noter -
            </Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <ScrollView ref='scrollView' style={styles.footer} scrollEnabled={false}>
                    <View >
                        <TextInput style={styles.textInput} ref='textInput'
                            onChangeText={(noteText) => this.setState({ noteText })}
                            value={this.state.noteText}
                            placeholder='>note'
                            placeholderTextColor='white'
                            /*onFocus={this.slideViewUpToShowInputElement('textInput')} *//>
                    </View>
                </ScrollView>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

        );
    }

    slideViewUpToShowInputElement(refName) {
        setTimeout(() => {
            let scrollResponder = this.refs.scrollView.getScrollResponder();
            scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
                ReactNative.findNodeHandle(this.refs[refName]),
                110, //additionalOffset
                true
            );
        }, 50);
    }

    addNote() {
        if (this.state.noteText) {
            var d = new Date();
            this.state.noteArray.push({
                'date': d.getFullYear() +
                    "/" + (d.getMonth() + 1) +
                    "/" + d.getDate(),
                'note': this.state.noteText
            });
            this.setState({ noteArray: this.state.noteArray })
            this.setState({ noteText: '' })
        }
    }

    deleteNote(key) {

        this.state.noteArray.splice(key, 1)
        this.setState({ noteArray: this.state.noteArray })

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#E91E63',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        paddingTop: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed'
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#E91E63',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});