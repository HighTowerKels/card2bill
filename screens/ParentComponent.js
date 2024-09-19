import React, { useState } from 'react';
import { View, Button } from 'react-native';
import NetworkSelectionModal from './components/NetworkSelectionModal';

const ParentComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title="Select Network" onPress={showModal} />
            <NetworkSelectionModal visible={modalVisible} onDismiss={hideModal} />
        </View>
    );
};

export default ParentComponent;
