import React, {Component} from "react";
import SafeAreaView from "react-native/Libraries/Components/SafeAreaView/SafeAreaView";
import {Dimensions, FlatList, Image, SectionList, Text, TouchableOpacity, View} from "react-native";
import Images from "./static/Images";
import * as actionCreators from "./store/actionCreators";
import connect from "react-redux/lib/connect/connect";

const {width, height} = Dimensions.get('window');

class ProgramDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            program_id: this.props.route.params.program_id,
            selectIndex: 0,
            section: null
        }
    }


    componentDidMount(): void {
        this.props.initProgram(this.state.program_id);
    }

    render() {
        return (
            this.props.program ?
                <SafeAreaView style={{flex: 1, backgroundColor: '#d0faf3'}}>
                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}>
                        <View
                            style={{
                                padding: 12,
                                backgroundColor: '#fff'
                            }}>
                            <Image
                                style={{
                                    width: width - 24,
                                    borderRadius: 12,
                                    height: width / 2,
                                }}
                                source={this.props.program.banner ? {url: this.props.program.banner} : Images.backgroundImage}/>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginTop: 15
                                }}>
                                <TouchableOpacity style={this.state.selectIndex === 0 ? {
                                    borderBottomColor: '#000',
                                    borderBottomWidth: 4
                                } : {}}
                                                  onPress={() => {
                                                      this.setState({
                                                          selectIndex: 0
                                                      })
                                                  }}
                                >
                                    <Text>OVERVIEW</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={this.state.selectIndex === 1 ? {
                                    borderBottomColor: '#000',
                                    borderBottomWidth: 4
                                } : {}}
                                                  onPress={() => {
                                                      this.setState({
                                                          selectIndex: 1
                                                      })
                                                  }}
                                >
                                    <Text>WORKOUTS</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.selectIndex === 0 ? this.renderOverView() : this.renderWorkOuts()}
                    </View>
                </SafeAreaView> : null
        );
    }

    renderOverView() {
        return (
            <View>
                <View style={{
                    backgroundColor: '#ffffff',
                    height: width / 2.5,
                    marginHorizontal: 12,
                    borderRadius: 12,
                    marginTop: 12,
                    padding: 12
                }}>
                    <Text>Coach's Overview</Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        margin: 12
                    }}>
                        <Image
                            style={{
                                height: 50,
                                width: 50,
                                borderColor: '#ff0',
                                borderRadius: 50,
                                backgroundColor: '#fff'
                            }}
                            source={this.props.program.instructor && this.props.program.instructor.avatar ? {url: this.props.program.instructor.avatar} : Images.backgroundImage}
                        />
                        <View style={{
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            margin: 12
                        }}>
                            <Text>{this.props.program.instructor && this.props.program.instructor.name}</Text>
                            <Text>{this.props.program.instructor && this.props.program.instructor.tagline}</Text>
                        </View>
                    </View></View>

                <View style={{
                    backgroundColor: '#ffffff',
                    height: 90,
                    marginHorizontal: 12,
                    borderRadius: 12,
                    marginTop: 12,
                    padding: 12
                }}>
                    <Text>Program Description</Text>
                    <Text>[{this.props.program.description}]</Text>
                </View>


                <View style={{
                    backgroundColor: '#ffffff',
                    height: 120,
                    marginHorizontal: 12,
                    borderRadius: 12,
                    marginTop: 12,
                    padding: 12
                }}>
                    <Text>What you'll gain</Text>
                    {
                        this.props.program.value_proposition ? this.props.program.value_proposition.map((item) => (
                            <Text>[{item}]</Text>)) : null
                    }
                </View>

                <View
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 12
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.getWorkOut();
                        }}
                        style={{
                            borderRadius: 20, backgroundColor: '#ff1',
                            width: 150, height: 50,
                            justifyContent: 'center', alignItems: 'center',
                        }}
                    ><Text>Start</Text></TouchableOpacity>
                </View>

            </View>
        );
    }

    renderWorkOuts() {
        console.log(JSON.stringify(this.props.program.weeks));
        return (
            <SectionList
                style={{padding: 12}}
                sections={this.props.program.weeks}
                renderItem={(item) => this._renderRecentItem(item)}
                renderSectionHeader={({section}) =>
                    this._renderSectionHeader(section)
                }
                keyExtractor={(item, index) => index}
            />
        );
    }

    _renderSectionHeader = (section) => {
        return (
            <TouchableOpacity
                style={{backgroundColor: '#fff', marginTop: 10}}
                onPress={() => {
                    this.props.program.weeks.map((item, index) => {
                        if (item.title === section.title) {
                            item.show = !item.show;
                        }
                    });
                    let newSection = JSON.parse(JSON.stringify(this.props.program));
                    this.setState({
                        section: newSection
                    })
                }}
            >
                <Text style={{
                    color: '#000',
                    margin: 12
                }}>{section.title}</Text>
                <View style={{backgroundColor: '#000', height: 1}}/>
            </TouchableOpacity>
        );
    };

    _renderRecentItem(item) {
        if (!item.item.title) {
            return (
                <View>
                </View>
            );
        } else {
            return (
                !item.section.show ? null :
                    <View style={{padding: 2, backgroundColor: '#fff',}}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 12
                        }}>
                            <Text>{item.item.title}</Text>
                            <TouchableOpacity
                                onPress={() => {

                                }}
                                style={{
                                    borderRadius: 20,
                                    backgroundColor: '#ff1',
                                    width: 150, height: 50,
                                    justifyContent: 'center', alignItems: 'center',
                                }}
                            ><Text>Watch</Text></TouchableOpacity>
                        </View>
                    </View>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        program: state.program
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        initProgram(program_id) {
            dispatch(actionCreators.getProgram(program_id));
        },
        getWorkOut() {
            dispatch(actionCreators.getWorkOut());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramDetail)