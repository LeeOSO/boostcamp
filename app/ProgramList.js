import React, {Component} from "react";
import {Image, StyleSheet, Dimensions, FlatList, View, Text, TouchableOpacity} from 'react-native';

import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import Images from "./static/Images";
import connect from "react-redux/lib/connect/connect";
import * as actionCreators from "./store/actionCreators";
import Loading from "./component/Loading";

const {width, height} = Dimensions.get('window');

class ProgramList extends Component {
    constructor() {
        super();
        this.state = {
            data: [{
                imageURL: Images.header,
                name: 'Program Name',
                coach: 'Coach Name',
                tagLine: ['1', '2'],
                tags: ['Beginner', 'Full Gym'],
            },
                {
                    imageURL: Images.header,
                    name: 'Program Name',
                    coach: 'Coach Name',
                    tagLine: ['1', '2'],
                    tags: ['Beginner', 'Full Gym'],
                }]
        }
    }


    componentDidMount(): void {
        this.props.initList();
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: '#d0faf3'}}>
                <Loading/>
                <FlatList
                    data={this.props.list}
                    renderItem={this.renderListItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView>
        );
    }

    renderListItem = ({item, index}) => {
        return (
            <TouchableOpacity
                key={index.toString()}
                style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    marginBottom: 12
                }}
                onPress={() => {
                    this.props.navigation.navigate('ProgramDetail', {program_id: item.id});
                }}
            >
                <Image
                    style={{
                        marginHorizontal: 12,
                        width: width - 24,
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                        height: width / 2,
                    }}
                    source={item.banner ? {url: item.banner} : Images.backgroundImage}
                />
                <View style={{
                    backgroundColor: '#ffffff',
                    height: width / 2.5,
                    marginHorizontal: 12,
                    borderBottomLeftRadius: 12,
                    borderBottomRightRadius: 12,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 12
                    }}>
                        <Text>{item.title}</Text>
                        <Text>{item.instructor && item.instructor.name ? item.instructor.name : ''}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        margin: 12
                    }}>
                        <Text>Tagline:[{item.tagline}]</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        margin: 12
                    }}>

                        <View style={{
                            borderRadius: 12,
                            margin: 5,
                            backgroundColor: '#c0ff53',
                        }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 10,
                                padding: 10,
                            }}>{item.difficulty}</Text>
                        </View>

                        <View style={{
                            borderRadius: 12,
                            margin: 5,
                            backgroundColor: '#c0ff53',
                        }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 10,
                                padding: 10,
                            }}>{item.weeksCount} Weeks</Text>
                        </View>
                        <View style={{
                            borderRadius: 12,
                            margin: 5,
                            backgroundColor: '#c0ff53',
                        }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 10,
                                padding: 10,
                            }}>{item.equipments}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = (state) => { //store数据映射到组件props中
    return {
        list: state.list
    };
};

const mapDispatchToProps = (dispatch) => { //store.dispatch(action);
    return {
        initList() {
            dispatch(actionCreators.getList());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramList)
