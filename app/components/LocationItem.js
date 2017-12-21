import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Button, Linking, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StarRating from 'react-native-star-rating'
import { getPlace } from '../api'
import { colors, iconSizes } from '../styles'

export default class Location extends React.Component {
    async goToDetail() {
        const { place, navigate } = this.props
        const { place_id } = place
        const placeDetails = await getPlace(place_id)

        navigate('DetailLocation', {
            place: placeDetails
        })
    }

    render() {
        const { name, vicinity, rating, isOpen, photo } = this.props.place

        return (
            <View style={styles.outer}>
                <View style={styles.infoWrap}>
                    <Image style={styles.image} source={{ uri: photo }} />
                    <View>
                        <Text style={styles.text}>{name}</Text>
                        <Text style={styles.text}>{vicinity}</Text>

                        {rating && (
                            <View style={styles.rating}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={rating}
                                    selectedStar={rating => this.onStarRatingPress(rating)}
                                    starColor={colors.yellow}
                                    starSize={20}
                                    buttonStyle={{ marginRight: 5 }}
                                />
                            </View>
                        )}

                        {isOpen && (
                            <View style={styles.openingHours}>
                                <Icon
                                    style={styles.openingHoursIcon}
                                    size={iconSizes.s}
                                    color={isOpen == 'gerade geschlossen' ? colors.red : colors.green}
                                    name="watch-later"
                                />
                                <Text>{isOpen}</Text>
                            </View>
                        )}
                    </View>
                </View>

                <View style={styles.callToAction}>
                    <Button
                        style={styles.callToActionButton}
                        onPress={this.goToDetail.bind(this)}
                        title="Details"
                        color={colors.primary}
                    />
                    <Text>&nbsp;&nbsp;&nbsp;</Text>
                    <Button
                        style={styles.callToActionButton}
                        onPress={() =>
                            Linking.openURL(`https://maps.google.com/?daddr=${name},${vicinity}&directionsmode=walking`)
                        }
                        title="Route"
                        color={colors.primary}
                    />
                </View>

                <View style={styles.divider} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outer: {
        padding: 8
    },
    infoWrap: {
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 8,
        borderRadius: 40
    },
    text: {
        flex: -1
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    openingHours: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    openingHoursIcon: {
        marginRight: 5
    },
    callToAction: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 5
    },
    divider: {
        paddingTop: 8,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1
    }
})