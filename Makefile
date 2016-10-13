PROTOC = $(NANOPB)/generator-bin/protoc --nanopb_out="-v:." -I$(HOME)/Arduino/libraries/TheThingsNetwork $(HOME)/Arduino/libraries/TheThingsNetwork/src

.PHONY: proto

proto:
	$(PROTOC)/api/protocol/*.proto
